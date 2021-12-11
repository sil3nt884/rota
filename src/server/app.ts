import * as express from 'express';
import * as http from 'http';
import * as dotenv from 'dotenv';
import * as process from 'process';
import createTask from './src/actions/createTask';
import updateTask from './src/actions/updateTask';
import sqlite from './src/service/sqlite';
import {getTask} from './src/actions/getTask';
import getAssignees from './src/actions/getAssignee';
import createAssignee from './src/actions/createAssignee';

import byteStreamHandler from './src/handlers/byteStreamHandler';
// import handleUpdates from './src/handlers/handleSubs';
import {createSub} from './src/handlers/createSub';

import {serverWrite, load} from './src/service/serverExcutetor';


const init = async () => {
  await load();
  const api = await serverWrite();
  const config = dotenv.config().parsed;
  const keys = Object.keys(config);
  keys
      .forEach((key) => process.env[key] = config[key]);


  const app = express();


  const env = process.env.ENV || 'local';
  const PORT = process.env.PORT || 3000;
  const frontendLocation = process.env.frontend || '../frontend/build/';

  app.use(express.json());
  app.use(byteStreamHandler);


  app.use(express.static(frontendLocation));

  app.post('/createAssignee', createAssignee);
  app.post('/createTask', createTask);
  app.patch('/updateTask/:id', updateTask);

  app.get('/task', (req, res) => {
    getTask(req, res, api);
  });

  app.get('/assignee', (req, res) => {
    getAssignees(req, res, api);
  });

  app.post('/subscription/', createSub);
  // app.get('/subscription/:id', (req, res) => handleUpdates(cache, req, res, events));
  const server = {
    start: () => {
      if (env === 'local') {
        http.createServer(app).listen(PORT, async ()=>{
          const config = dotenv.config().parsed;
          const keys = Object.keys(config);
          keys
              .forEach((key) => process.env[key] = config[key]);
          console.log('starting with config', keys
              .map((k) => ({[k]: process.env[k]})));
        });
      }
    },
  };

  server.start();
};


init();
