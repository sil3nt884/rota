import {Request, Response} from 'express';
import {v4 as uuid} from 'uuid';
import {Task} from '../types/types';
import {serverWrite} from '../service/serverExcutetor';


export default async (req: Request, res: Response) => {
  const {title, description} = req.body;
  const taskBody : Task = {
    id: uuid(),
    title,
    description,
    state: 'not done',
    created_at: new Date().toISOString(),
    last_updated_at: new Date().toISOString(),
  };
  const api = await serverWrite();
  await api.createTask(taskBody);
  return res.status(200).json('Added Task');
};
