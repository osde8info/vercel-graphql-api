// import { ApolloServer } from '@saeris/apollo-server-vercel'
//
// const { router, get, post, options } = require('microrouter');
//
// const cors = require('micro-cors')(); // highlight-line
//
// const { send } = require('micro');
//
// const GRAPHQL_ENDPOINT = '/api/graphql';
//
// const typeDefs = gql`
//   type Query {
//     users: [User!]!
//   }
//   type User {
//     name: String
//   }
// `
//
// const resolvers = {
//   Query: {
//     users(parent, args, context) {
//       return [{ name: 'Nextjs' }]
//     },
//   },
// }
//
// const apolloServer = new ApolloServer({
//   typeDefs,
//   resolvers,
//   instrospection: true,
//   playground: true
// });
//
// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }
//
// module.exports = apolloServer.start().then(() => {
//   const handler = apolloServer.createHandler({
//     path: GRAPHQL_ENDPOINT
//   });
//   return router(
//       get('/', (req, res) => 'Welcome!'),
//       post(GRAPHQL_ENDPOINT, handler),
//       get(GRAPHQL_ENDPOINT, handler),
//   );
// });
// Create a new API endpoint handler in the appropriate directory for your project:
// Vercel: ./api/<endpoint-name>.{js|ts}
// Nextjs: ./pages/api/<endpoint-name>.{js|ts} or ./src/pages/api/<endpoint-name>.{js|ts}

import { ApolloServer } from "@saeris/apollo-server-vercel";

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => "Hello world!"
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,

  // By default, the GraphQL Playground interface and GraphQL introspection
  // is disabled in "production" (i.e. when `process.env.NODE_ENV` is `production`).
  //
  // If you'd like to have GraphQL Playground and introspection enabled in production,
  // the `playground` and `introspection` options must be set explicitly to `true`.
  playground: true,
  introspection: true
});

export default server.createHandler();

// You should now be able to access your new endpoint from via::
// http://localhost:3000/api/<endpoint-name>
