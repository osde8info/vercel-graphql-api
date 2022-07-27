import { ApolloServer, gql } from 'apollo-server-micro'

const { router, get, post, options } = require('microrouter');

const cors = require('micro-cors')(); // highlight-line

const { send } = require('micro');

const GRAPHQL_ENDPOINT = '/api/graphql';

const typeDefs = gql`
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: 'Nextjs' }]
    },
  },
}

const apolloServer = new ApolloServer({
  typeDefs, resolvers
});

export const config = {
  api: {
    bodyParser: false,
  },
}

module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler({
    path: GRAPHQL_ENDPOINT
  });
  return router(
      get('/', (req, res) => 'Welcome!'),
      post(GRAPHQL_ENDPOINT, handler),
      get(GRAPHQL_ENDPOINT, handler),
  );
});
