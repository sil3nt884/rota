import {Request, Response} from 'express';
import {update, findByID} from '../service/db';
import {Database} from './contants';

export default async (
    {params: {id},
      body: {
        name,
      }}: Request, res: Response) => {
  const existingRecord = await findByID({id}, Database.ASSIGNEE);
  if (!existingRecord) {
    return res.status(404).json('record not found');
  }
  const updatedTask = {
    ...existingRecord,
    name,
  };
  await update(updatedTask, Database.TASK);
  return res.status(200).json('Task updated');
};
