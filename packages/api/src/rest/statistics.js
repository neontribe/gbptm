const express = require('express');
const router = express.Router();
const config = require('../config');
const { Loo, Report } = require('../db')(config.mongo.url);
const _ = require('lodash');
const { DateTime } = require('luxon');

function scopeQuery(query, options) {
  var start = options.start
    ? DateTime.fromISO(options.start)
    : DateTime.fromISO('2009-01-01');
  var end = options.end ? DateTime.fromISO(options.end) : DateTime.local();
  var area = options.area || 'All';
  var areaType = options.areaType || 'All';
  var includeInactive = options.includeInactive || false;
  query['$and'] = [
    {
      createdAt: {
        $gte: start.toJSDate(),
      },
    },
    {
      createdAt: {
        $lte: end.toJSDate(),
      },
    },
  ];

  if (!includeInactive) {
    query.$and.push({ 'properties.active': true });
  }

  if (areaType !== 'All') {
    query.$and.push({ 'properties.area.type': areaType });
  }

  if (area !== 'All') {
    query.$and.push({ 'properties.area.name': area });
  }

  return query;
}

function handleDeprecated(res) {
  res.status(400).json({
    message:
      'This API endpoint has moved permanently to the GraphQL API interface. [TODO more info]',
  });
}

router.get('/counters', (req, res) => handleDeprecated(res));

router.get('/proportions', (req, res) => handleDeprecated(res));

router.get('/contributors', async (req, res) => {
  //const scope = scopeQuery({contributor: { $exists: true }}, req.query);
  const contributors = await Report.aggregate([
    {
      $match: { contributor: { $exists: true } },
    },
    {
      $group: {
        _id: '$contributor',
        reports: {
          $sum: 1,
        },
      },
    },
  ]).exec();

  res.status(200).json(
    _.transform(
      contributors,
      function(acc, val) {
        acc[val._id] = val.reports;
      },
      {}
    )
  );
});

router.get('/areas', async (req, res) => {
  const scope = scopeQuery({}, _.merge({ includeInactive: true }, req.query));
  const areas = await Loo.aggregate([
    {
      $match: scope,
    },
    {
      $unwind: '$properties.area',
    },
    {
      $project: {
        areaType: {
          $cond: [
            '$properties.area.type',
            '$properties.area.type',
            'Unknown Type',
          ],
        },
        areaName: {
          $cond: [
            '$properties.area.name',
            '$properties.area.name',
            'Unknown Area',
          ],
        },
        active: {
          $cond: ['$properties.active', 1, 0],
        },
        public: {
          $cond: [
            {
              $eq: ['$properties.access', 'public'],
            },
            1,
            0,
          ],
        },
        permissive: {
          $cond: [
            {
              $eq: ['$properties.access', 'permissive'],
            },
            1,
            0,
          ],
        },
        babyChange: {
          $cond: [
            {
              $and: [
                { $eq: ['$properties.babyChange', true] },
                { $eq: ['$properties.active', true] },
              ],
            },
            1,
            0,
          ],
        },
      },
    },
    {
      $group: {
        _id: '$areaName',
        looCount: {
          $sum: 1,
        },
        activeLooCount: {
          $sum: '$active',
        },
        publicLooCount: {
          $sum: '$public',
        },
        permissiveLooCount: {
          $sum: '$permissive',
        },
        babyChangeCount: {
          $sum: '$babyChange',
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]).exec();

  res.status(200).json(areas);
});

module.exports = router;