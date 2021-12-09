import * as http from 'http';
import {insert, update} from './db';
import {Assignee, Task} from '../types/types';
import * as dotenv from 'dotenv';
import * as process from 'process';


const config = dotenv.config().parsed;

const keys = Object.keys(config);
keys
    .forEach((key) => process.env[key] = config[key]);
console.log('starting with config', keys
    .map((k) => ({[k]: process.env[k]})));

const serverAddress = process.env.serverAddress;
console.log(serverAddress);

const request = (url : string) => {
  return {
    get: () => {
      return new Promise((resolve, reject) => {
        const parsedURL = new URL(url);
        const options = {
          hostname: parsedURL.hostname,
          port: parsedURL.port,
          path: parsedURL.pathname,
          method: 'GET',
        };
        http.get(options, (res)=>{
          let body = '';
          res.on('data', (data) => {
            body+=String(data);
          });
          res.on('end', ()=> resolve({body, statusCode: res.statusCode}));
          // eslint-disable-next-line prefer-promise-reject-errors
        }).on('error', () => resolve(undefined));
      });
    },
    post: (body: string) => {
      return new Promise((resolve, reject) => {
        const parsedURL = new URL(url);
        const options = {
          hostname: parsedURL.hostname,
          port: parsedURL.port,
          path: parsedURL.pathname,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length,
          },
        };

        const req = http.request(options, (res)=>{
          let body = '';
          res.on('data', (data) => {
            body+=String(data);
          });
          res.on('end', ()=> resolve({body, statusCode: res.statusCode}));
          // eslint-disable-next-line prefer-promise-reject-errors
        }).on('error', () => resolve(undefined));

        req.write(body);
      });
    },
  };
};

const isServerAlive = async () => {
  return await request(`${serverAddress}/heatbeat`).get();
};

let attempts = 0;
const pollSeverStatus = async () => {
  const serveStatus = await isServerAlive();
  const timeout = setTimeout(() =>{
    if (attempts >= 3) {
      clearTimeout(timeout);
      return;
    }
    if (!serveStatus) {
      attempts++;
      console.log('server not alive', attempts);
      pollSeverStatus();
    }
  }, 1000);
  if (serveStatus) {
    clearTimeout(timeout);
    return serveStatus;
  }
};


const assignees : Assignee[] = [];
const tasks : Task[] = [];
export const serverWrite = async () => {
  const api = {
    createAssignee: async (assignee : Assignee ) => {
      const status : any = await pollSeverStatus();
      const isAlive = status && status.statusCode === 200;
      if (isAlive) {
        console.log('writing  assignee to server');
        const sql = await insert(assignee, 'assignee');
        assignees.push(assignee);
        await request(`${serverAddress}/write`).post(JSON.stringify({sql}));
      } else {
        assignees.push(assignee);
      }
    },
    getAssignees: () => {
      return assignees;
    },
    createTask: async (task : Task) => {
      const status : any = await pollSeverStatus();
      const isAlive = status && status.statusCode === 200;
      if (isAlive) {
        console.log('writing  task to server');
        const sql = await insert(task, 'task');
        tasks.push(task);
        await request(`${serverAddress}/write`).post(JSON.stringify({sql}));
      } else {
        tasks.push(task);
      }
    },
    getTask: () => {
      return tasks;
    },

    updateTask: async (task : Task) => {
      const status : any = await pollSeverStatus();
      const isAlive = status && status.statusCode === 200;
      if (isAlive) {
        const updateJson = update(task, 'task');
        await request(`${serverAddress}/write`).post(JSON.stringify({updateJson}));
        const t = tasks.filter((e : Task) => e.id === task.id)[0];
        const index = tasks.indexOf(t);
        tasks[index] = {...t, ...task};
      } else {
        const t = tasks.filter((e : Task) => e.id === task.id)[0];
        const index = tasks.indexOf(t);
        tasks[index] = {...t, ...task};
      }
    },
  };

  return api;
};
