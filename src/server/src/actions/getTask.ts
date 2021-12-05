import {Request, Response} from 'express';
import {fetch} from '../service/db';
import * as NodeCache from 'node-cache';
import * as Events from 'events';

let listenerSet = false;

export const getTask = async (req: Request, res: Response, cache: NodeCache, events: Events) => {
  const unassignedTask : any = cache.get('unassignedTask');
  const assignedTask : any = cache.get('assignedTask');
  const doneTask : any = cache.get('doneTask');
  const [unassignedTaskKey, assignedTaskKey, doneTaskKey] = ['unassignedTask', 'assignedTask', 'doneTask'];
  const tll = 600;

  if (!unassignedTask) {
    const data = await fetch('unsigned_tasks');
    console.log('empty cache');
    cache.set(unassignedTaskKey, data, tll);
  }

  if (!assignedTask) {
    const data = await fetch('assigned_tasks');
    console.log('empty cache');
    cache.set(assignedTaskKey, data, tll);
  }

  if (!doneTask) {
    const data = await fetch('done_tasks');
    cache.set(doneTaskKey, data, tll);
  }

  const expiredCB = async (key : string, value: string) => {
    console.log('expired', key);
    if (key === unassignedTaskKey) {
      const data = await fetch('unsigned_tasks');
      cache.set(unassignedTaskKey, data, tll);
      events.emit('cacheExpired', key, data);
    }

    if (key === assignedTaskKey) {
      const data = await fetch('assigned_tasks');
      cache.set(assignedTaskKey, data, tll);
      events.emit('cacheExpired', key, data);
    }

    if (key === doneTaskKey) {
      const data = await fetch('done_tasks');
      cache.set(doneTaskKey, data, tll);
      events.emit('cacheExpired', key, data);
    }
  };

  if (!listenerSet) {
    cache.on('expired', expiredCB);
    listenerSet = true;
  }


  return res.status(200).json({unassignedTask, assignedTask, doneTask});
};
