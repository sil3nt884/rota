import {Request, Response} from 'express';

import * as NodeCache from 'node-cache';
import * as Events from 'events';
import {serverWrite} from '../service/serverExcutetor';
import {Task} from '../types/types';


export const getTask = async (req: Request, res: Response, cache: NodeCache, events: Events) => {
  const api = await serverWrite();
  const tasks = api.getTask();

  const unassignedTask = tasks.filter((e : Task) => !e.assigneeID);
  const assignedTask = tasks.filter((e : Task) => e.assigneeID && e.state === 'not done');
  const doneTask = tasks.filter((e : Task) => e.state === 'done');

  return res.status(200).json({unassignedTask, assignedTask, doneTask});
};
