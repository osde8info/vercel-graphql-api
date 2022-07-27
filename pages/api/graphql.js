import { ApolloServer, gql } from 'apollo-server-micro'

const cors = require('micro-cors')(); // highlight-line
const { send } = require('micro');

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

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

module.exports = apolloServer.start().then(() => {
  const handler = apolloServer.createHandler({
    path: '/api/graphql'
  });
  return cors((req, res) => req.method === 'OPTIONS' ? send(res, 200, 'ok') : handler(req, res))
});
