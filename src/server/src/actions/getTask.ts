import {Request, Response} from 'express';
import {Task} from '../types/types';


export const getTask = async (req: Request, res: Response, api : any) => {
  const tasks = api.getTask();
  let unassignedTask : any = [];
  let assignedTask : any = [];
  let doneTask : any= [];
  if (tasks) {
    unassignedTask = tasks.filter((e: Task) => !e.assigneeID);
    assignedTask = tasks.filter((e: Task) => e.assigneeID && e.state === 'not done');
    doneTask = tasks.filter((e: Task) => e.state === 'done');
  }

  return res.status(200).json({unassignedTask, assignedTask, doneTask});
};
