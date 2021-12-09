import {Request, Response} from 'express';
import {serverWrite} from '../service/serverExcutetor';

import * as NodeCache from 'node-cache';
import * as Events from 'events';

export default async ( Request : Request, res: Response, cache : NodeCache, events: Events) => {
  const api = await serverWrite();
  const assignees = api.getAssignees();
  return res.status(200).json({assignees});
};
