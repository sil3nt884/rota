import {Request, Response} from 'express';
import {fetch} from '../service/db';

import * as NodeCache from 'node-cache';

export default async ( Request : Request, res: Response, cache : NodeCache) => {
  let assignees = cache.get('assignees');
  if (!assignees) {
    console.log('unassigned task cache expire fetching from db');
    assignees = await fetch('assignees');
    cache.set('unassignedTask', assignees, 3600);
  }
  return res.status(200).json({assignees});
};
