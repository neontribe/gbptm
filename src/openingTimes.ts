import getISODay from 'date-fns/getISODay';
import set from 'date-fns/set';
import setISODay from 'date-fns/setISODay';
import isWithinInterval from 'date-fns/isWithinInterval';

function isClosed(range) {
  return Array.isArray(range) && range.length === 0;
}

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

function getDateFromTime(timeRangeString, weekdayToCheck) {
  const [hours, minutes] = timeRangeString.split(':');

  const weekday =
    timeRangeString === '00:00' ? weekdayToCheck + 1 : weekdayToCheck;

  return setISODay(
    set(new Date(), {
      hours: hours,
      minutes: minutes,
      seconds: 0,
    }),
    weekday
  );
}

function getIsOpen(openingTimes = [], dateTime = new Date()) {
  const weekdayToCheck = getISODay(dateTime);
  const timeRangeToCheck = openingTimes[weekdayToCheck - 1];

  if (isClosed(timeRangeToCheck)) {
    return false;
  }

  if (!timeRangeToCheck) {
    return null;
  }

  // if times are the same we can assume 24 hour opening
  if (timeRangeToCheck[0] === timeRangeToCheck[1]) {
    return true;
  }

  const startDateTime = getDateFromTime(timeRangeToCheck[0], weekdayToCheck);
  const endDateTime = getDateFromTime(timeRangeToCheck[1], weekdayToCheck);

  const isDateWithinInterval = isWithinInterval(dateTime, {
    start: startDateTime,
    end: endDateTime,
  });

  if (isDateWithinInterval) {
    return true;
  }

  return false;
}

export { isClosed };

export { WEEKDAYS };

export { getIsOpen };
