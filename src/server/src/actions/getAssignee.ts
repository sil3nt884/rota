import {Request, Response} from 'express';


export default async ( Request : Request, res: Response, api : any) => {
  const assignees = api.getAssignees();
  return res.status(200).json({assignees});
};
