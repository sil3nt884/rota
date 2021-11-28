import {Request, Response} from 'express';
import * as fs from 'fs';

export interface CustomRequest extends Request {
   rawBody : any
   rawBytes: any
}

export default (req: CustomRequest, res: Response, next:any ) => {
  const mime = req.headers['content-type'];

  if (mime === 'application/octet-stream') {
    req.setEncoding('utf-8');
    req.rawBytes = '';
    req.on('data', function(chunk) {
      req.rawBytes += chunk;
    });

    req.on('end', function() {
      const bytes = req.rawBytes.split(',')
          .map((e : string) => parseInt(e));
      req.rawBody = bytes;
      next();
    });
  } else {
    next();
  }
};
