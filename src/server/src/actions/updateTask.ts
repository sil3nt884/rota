import {Request, Response} from 'express';
import {update, findByID} from '../service/db';
import {Database} from './contants';
import * as fs from 'fs';
import {CustomRequest} from '../handlers/byteStreamHandler';


const readPartOfBuffer = (buffer: any, start : number, end: number) => {
  const bufferCopy = [];
  for (; start < end; start++) {
    bufferCopy.push(buffer[start]);
  }
  return bufferCopy;
};

export default async (req: CustomRequest, res: Response) => {
  const body = req.rawBody;
  const {id} = req.params;
  const jsonLength = body[0];
  const json = Buffer.from(readPartOfBuffer(body, 1, jsonLength+1)).toString('utf8');
  const image = Buffer.from(readPartOfBuffer(body, jsonLength+1, body.length));
  const imageBased64 = image.toString('base64');
  const parsedJSON = JSON.parse(json);

  const updatedObject = {...parsedJSON, id, image: imageBased64};
  const existingRecord = await findByID({id}, Database.TASK);
  if (!existingRecord) {
    return res.status(404).json('record not found');
  }
  await update(updatedObject, Database.TASK);
  return res.status(200).json('Task updated');
};
