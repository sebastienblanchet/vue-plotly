import GraphQLJSON from 'graphql-type-json'
import {
  mocks
} from "./mocks.json";

// TODO hookup with db
export default {
  JSON: GraphQLJSON,
  Query: {
    getPlots: (root, {}) => {
      return mocks;
    },
    getPlotly: (root, {
      id
    }) => {
      var index = mocks.findIndex(x => x.id === id);
      return mocks[index];
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