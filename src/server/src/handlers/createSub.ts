import * as crypto from 'crypto';
import {Request, Response} from 'express';
import {insert} from '../service/db';


const subscriptions: any = {};
// eslint-disable-next-line require-jsdoc
export default function createHash(input : string) {
  const md5sum = crypto.createHash('md5');
  md5sum.update(Buffer.from(input));
  return md5sum.digest('hex');
}

export const createSub = async (req: Request, res: Response) => {
  const subscriptionRequest = req.body;
  const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
  subscriptions[susbscriptionId] = subscriptionRequest;
  const record = {id: susbscriptionId, value: JSON.stringify(subscriptions[susbscriptionId])};
  await insert(record, 'subscriptions').catch(e => res.status(400));

  res.status(201).json({id: susbscriptionId});
};
