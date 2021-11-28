import {Request, Response} from 'express';
import {fetch} from '../service/db';
import * as NodeCache from 'node-cache';

let listenerSet = false;

export const getTask = async (req: Request, res: Response, cache: NodeCache) => {
  const unassignedTask : any = cache.get('unassignedTask');
  const assignedTask : any = cache.get('assignedTask');
  const [unassignedTaskKey, assignedTaskKey] = ['unassignedTask', 'assignedTask'];
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

  const expiredCB = async (key : string, value: string) => {
    console.log('expired', key);
    if (key === unassignedTaskKey) {
      const data = await fetch('unsigned_tasks');
      cache.set(unassignedTaskKey, data, tll);
    }

    if (key === assignedTaskKey) {
      const data = await fetch('assigned_tasks');
      cache.set(assignedTaskKey, data, tll);
    }
  };

  if (!listenerSet) {
    cache.on('expired', expiredCB);
    listenerSet = true;
  }


  return res.status(200).json({unassignedTask, assignedTask});
};