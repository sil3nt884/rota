import {Response} from 'express';
import {serverWrite} from '../service/serverExcutetor';
import {CustomRequest} from '../handlers/byteStreamHandler';
import {Assignee, Task} from '../types/types';


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
    const api = await serverWrite();
    const assignee = api.getAssignees().filter((e : Assignee) => e.id === assigneeID)[0];
    if (!assignee) {
      return res.status(404).json('assignee not found ');
    }

    if (!(state in validState)) {
      return res.status(404).json('no state provided not found ');
    }

    const existingRecord = api.getTask().filter((e : Task) => e.id === id)[0];

    if (!existingRecord) {
      return res.status(404).json('record not found');
    }

    await api.updateTask({...existingRecord, assigneeID, state, image: imageBased64, last_updated_at: new Date().toISOString()});


    return res.status(200).json('Task updated');
  } else {
    return res.status(400).json('Bad Request');
  }
};
