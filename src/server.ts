import { createServer } from 'node:http'
import { PrismaClient } from '@prisma/client'
import { createYoga } from 'graphql-yoga'
import { schema } from './schema.js'

// Create a Prisma Client instance.
const prisma = new PrismaClient()

// Create a Yoga instance with a GraphQL schema.
const yoga = createYoga({ schema, context: { prisma } })

// Pass it into a server to hook into request handlers.
const server = createServer(yoga)

// Start the server and you're done!
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})