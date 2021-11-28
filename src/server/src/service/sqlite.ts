import * as sqlite3 from 'sqlite3';
import {open} from 'sqlite';
import {access, open as fileOpen, readFile, readdir} from 'fs/promises';
import {constants} from 'fs';


export default async () => {
  const db = process.env.dbLocation || '../db/database.db';


  await access(db, constants.F_OK)
      .catch(async () => {
        console.log('file deos not exisit creating file');
        fileOpen(db, 'w+')
            .then((e) => e.close());
        const database = await openDB();
        createDB(database);
      });
  console.log('DB exist at', db);
};

export const openDB = async () => {
  const db = process.env.dbLocation || '../db/database.db';
  return open({
    filename: db,
    driver: sqlite3.Database,
  });
};

const createDB = async (database : any ) => {
  const scriptsFiles = process.env.scriptFiles || 'src/service/scripts/';
  const scripts = await readdir(scriptsFiles);
  scripts
      .map(async (file: string) => await readFile(`${scriptsFiles}/${file}`, 'utf-8'))
      .forEach(async (e) => database.exec(await e));
};

export const closeDB = async (db : any) => db.close();
