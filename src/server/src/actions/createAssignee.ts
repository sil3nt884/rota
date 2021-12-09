import {Request, Response} from 'express';
import {v4 as uuid} from 'uuid';
import {Assignee} from '../types/types';
import {serverWrite} from '../service/serverExcutetor';

export default async (req: Request, res: Response) => {
  const {name} = req.body;
  const assignee : Assignee = {
    id: uuid(),
    name,
  };
  const api =await serverWrite();
  await api.createAssignee(assignee);
  return res.status(200).json('Added Assigned');
};
