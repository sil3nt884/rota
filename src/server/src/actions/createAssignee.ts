import {Request, Response} from 'express';
import {insert} from '../service/db';
import {v4 as uuid} from 'uuid';
import {Assignee} from '../types/types';

export default async (req: Request, res: Response) => {
  const {name} = req.body;
  const assignee : Assignee = {
    id: uuid(),
    name,
  };
  await insert(assignee, 'assignee');
  return res.status(200).json('Added Assigned');
};
