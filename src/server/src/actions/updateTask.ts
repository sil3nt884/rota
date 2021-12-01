import {Response} from 'express';
import {update, findByID} from '../service/db';
import {Database} from './contants';

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
  if (body) {
    const {id} = req.params;
    const jsonLength = body[0];
    const json = Buffer.from(readPartOfBuffer(body, 1, jsonLength + 1)).toString('utf8');
    const image = Buffer.from(readPartOfBuffer(body, jsonLength + 1, body.length));
    const imageBased64 = image.toString('base64');
    const parsedJSON = JSON.parse(json);

    const validState = {
      'not done': 'not done',
      'done': 'done',
    };

    const {state, assigneeID} = parsedJSON;


    const results = await Promise.all([findByID({id}, Database.TASK), findByID({id: assigneeID}, Database.ASSIGNEE)]);
    const [existingRecord, assignee] = results;

    if (!existingRecord) {
      return res.status(404).json('record not found');
    }

    if (!assignee) {
      return res.status(404).json('assignee not found ');
    }

    if (!(state in validState)) {
      return res.status(404).json('no state provided not found ');
    }

    await update({...existingRecord, assigneeID, state, image: imageBased64}, Database.TASK);
    return res.status(200).json('Task updated');
  } else {
    return res.status(400).json('Bad Request');
  }
};
