import * as http from 'http';
import {insert, update} from './db';
import {Assignee, Task} from '../types/types';
import * as dotenv from 'dotenv';
import * as process from 'process';
import * as Event from 'events';

const events = new Event();

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
    get: () : any => {
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

const delay = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('');
    }, 10 * 1000);
  });
};

export const pollSeverStatusContinuous = async () => {
  await delay();
  const serveStatus = await isServerAlive();
  if (serveStatus) {
    events.emit('serverAlive');
  }
  await pollSeverStatusContinuous();
};


let assignees : Assignee[] = [];
let tasks : Task[] = [];
let listenerSet = false;
const sync = async () => {
  if (!listenerSet) {
    events.on('serverAlive', async () => {
      console.log('syncing');
      await request(`${serverAddress}/sync`).post(JSON.stringify({
        assignees,
        tasks,
      }));
    });
    listenerSet = true;
  }
};

let once = false;
export const load = async () => {
  if (!once) {
    const status: any = await pollSeverStatus();
    const isAlive = status && status.statusCode === 200;
    if (isAlive) {
      const {
        body: {
          assignees: a,
          task: t,
        },
      } = await request(`${serverAddress}/load`).get();
      if (a) {
        assignees = a;
      }
      if (t) {
        tasks = t;
      }
    } else {
      assignees = [];
      tasks = [];
      console.log('load failed');
      return;
    }
    once = true;
  }
};

export const serverWrite = async () => {
  pollSeverStatusContinuous();
  sync();

  const api = {
    createAssignee: async (assignee : Assignee ) => {
      const status : any = await pollSeverStatus();
      const isAlive = status && status.statusCode === 200;
      if (isAlive) {
        console.log('writing  assignee to server');
        const sql = insert(assignee, 'assignee');
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
        const sql = insert(task, 'task');
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
