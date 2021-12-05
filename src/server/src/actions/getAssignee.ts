import {Request, Response} from 'express';
import {fetch} from '../service/db';

import * as NodeCache from 'node-cache';
import * as Events from 'events';


let listenerSet = false;
export default async ( Request : Request, res: Response, cache : NodeCache, events: Events) => {
  let assignees = cache.get('assignees');

  if (!assignees) {
    assignees = await fetch('assignees');
    cache.set('assignees', assignees, 3600);
  }

  const expiredCB = async (key : string, value: string) => {
    if (key === 'assignees') {
      const data = await fetch('assignees');
      cache.set('assignees', data, 3600);
      events.emit('cacheExpired', key, data);
    }
  };

  if (!listenerSet) {
    cache.on('expired', expiredCB);
    listenerSet = true;
  }

  return res.status(200).json({assignees});
};
