import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { useSofa, OpenAPI } from 'sofa-api';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
// import { writeFileSync } from 'fs';
import {
  PrismaClient,
  resolvers,
} from '@proximity-crud-application/prisma-client';
import { ApolloServer } from 'apollo-server-express';
import { Menu } from './api';
import * as path from 'path';
import * as tq from 'type-graphql';

const prisma = new PrismaClient();

const startServer = async () => {
  const schema = await tq.buildSchema({
    resolvers: resolvers,
    emitSchemaFile: path.resolve(__dirname, 'schema.gql'),
  });

  const context = () => {
    return {
      prisma,
    };
  };

  const apolloServer = new ApolloServer({ schema, context });

  const app = express();
  app.use(cors());

  const openApi = OpenAPI({
    schema,
    info: {
      title: 'CIRCLE CONNECTS ',
      version: '3.0.0',
    },
  });

  app.use(
    '/api',
    useSofa({
      basePath: '/api',
      schema,
      // @ts-ignore 
      async context({ req }) {
        return {
          req,
          prisma,
        };  
      },
      onRoute(info) {
        openApi.addRoute(info, {
          basePath: '/api',
        });
      },
    })
  );

  // writes every recorder route
  // writeFileSync('./apps/api/src/swagger.json', JSON.stringify(openApi.get(), null, 2));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // app.get('/api', (req, res) => {
  //   res.send({ msg: 'Welcome to API\'s' });
  // });

  app.use('/menu', Menu);

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });

  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });
  server.on('error', console.error);
};

startServer();
