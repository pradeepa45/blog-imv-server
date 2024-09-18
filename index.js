import dotenv from 'dotenv'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone';

import resolvers from './resolvers/index.js'
import schema from "./schema.js"

dotenv.config()

const port = process.env.PORT || 3300

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  })

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  })

  console.log(`🚀  Server ready at: ${url}`);
}

startServer().catch((err) => {
  console.error('Error starting server:', err)
})
