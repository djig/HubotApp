import express from 'express';
import cors from 'cors';
import {logSuccess} from './chalkConfig';
import { 
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import config from 'config';
import { schema } from './schema';
const PORT = config.get("port");
const server = express();
const webServer = "http://" + config.get("webServer.host") + ":" + config.get("webServer.port");

server.use('*', cors({ origin: webServer }));
server.use('/graphql', bodyParser.json(), graphqlExpress({
  schema
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

server.listen(PORT, () => console.log(logSuccess(`GraphQL Server is now running on http://localhost:${PORT}`)));