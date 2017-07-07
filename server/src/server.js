import express from 'express';
import cors from 'cors';
import yargs from 'yargs';
import {logSuccess} from './chalkConfig';
import { routes } from './routes';
import { 
  graphqlExpress,
  graphiqlExpress,
} from 'graphql-server-express';
import bodyParser from 'body-parser';
import config from 'config';
import { schema } from './schema';
const serverMode = yargs.argv.mode;
let PORT = config.get("grapQlport");
const server = express(),
      webServer = `http://${config.get("webServer.host")}:${config.get("webServer.port")}`;

server.use('*', cors({ origin: webServer }));

if(serverMode === "restAPI") {
  PORT = config.get("restAPIport");
  server.get('/', (req, res) =>
    res.send('Hello World!')
  );
  routes(server);
} else {
  server.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
  }));
  server.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));
}
server.get((req, res) => {
    res.status(404).send({url: req.originalUrl + ' not found'});
  });

server.listen(PORT, () => console.log(logSuccess(`${serverMode} Server is now running on http://localhost:${PORT}`)));