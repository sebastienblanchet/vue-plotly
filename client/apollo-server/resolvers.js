import GraphQLJSON from 'graphql-type-json'
import {
  mocks
} from "./mocks.json";

// TODO hookup with db

export default {
  JSON: GraphQLJSON,
  Query: {
    hello: (root, {
      name
    }) => `Hello ${name || 'World'}!`,
    getIds: (root, {}) => {
      return Object.keys(mocks);
    },
    getPlotly: (root, {
      id
    }) => {
      // return new Promise((resolve, object) => {
      //   mocks.find(id, (err, mock) => {
      //     if (err) reject(err)
      //     else resolve(mock)
      //   });
      // });
      return mocks[id];
    }
  },
  Mutation: {
    myMutation: (root, args, context) => {
      const message = 'My mutation completed!'
      context.pubsub.publish('hey', {
        mySub: message
      })
      return message
    },

  }
}