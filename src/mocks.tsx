import { setupWorker, rest } from 'msw';
import { graphql } from 'graphql';
import { getExecutableSchema, mockResolver } from '@lola-tech/graphql-kimera';
import { v4 as uuid } from 'uuid';
import { loader } from 'graphql.macro';

const typeDefs = loader('./api/typeDefs.graphql');

const schema = getExecutableSchema({
  typeDefs,
  mockProvidersFn: () => ({
    scenario: {
      loosByProximity: mockResolver((store) => () => {
        return [store.get()[0]];
      }),
      loo: mockResolver((store) => (_, { id }) => ({
        ...store.get(),
        id,
      })),
    },
    builders: {
      ID: () => uuid(),
      Report: () => ({
        previous: null,
      }),
      Point: () => ({
        lat: 51.507351,
        lng: -0.127758,
      }),
      DateTime: () => '2020-03-27T19:34:23.226Z',
      OpeningTimes: () => null,
    },
  }),
});

const mocks = [
  rest.post('/api', async (req, res, ctx) => {
    let result  = await graphql(schema, req.body.query, null, null, JSON.parse(req.body.variables));

    return res(
      ctx.json(result)
    );
  })
];

const worker = setupWorker(...mocks);
worker.start();
