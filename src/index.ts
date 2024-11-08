import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import resolvers from './resolvers/mutationResolvers';  // Import your resolvers
import { gql } from 'graphql-tag';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env variables
dotenv.config();

// Read the GraphQL schema from the .graphql file
const typeDefs = gql(fs.readFileSync(path.join(__dirname, './schema/schema.graphql'), 'utf-8'));

// Connect to MongoDB using the URI from the .env file
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/UserRegistration_Db')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

// Initialize Express
const app = express();
app.use(express.json());

// Setup Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  // Start Express server
  app.listen(4000, () => {
    console.log('Server is running on http://localhost:4000/graphql');
  });
};

startServer();