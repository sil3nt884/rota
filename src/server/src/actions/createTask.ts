import {Request, Response} from 'express';
import {insert} from '../service/db';
import {v4 as uuid} from 'uuid';
import {Task} from '../types/types';

export default async (req: Request, res: Response) => {
  const {title, description} = req.body;
  const taskBody : Task = {
    id: uuid(),
    title,
    description,
    state: 'not done',
    created_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString()
  };
  await insert(taskBody, 'task');
  return res.status(200).json('Added Task');
};
