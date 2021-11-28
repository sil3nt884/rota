import {openDB, closeDB} from './sqlite';


export const insert = async (object : any, table : string) => {
  const db = await openDB();
  const cols = Object.keys(object);
  const insetstm = `insert into "${table}" (${cols.join(',')}) values (${cols.map((e) => `${'$'+e}`).join(',')});`;
  await db.run(insetstm, Object.values(object));
  await closeDB(db);
};

export const update = async (object : any, table : string) => {
  const db = await openDB();
  const id = object.id;
  delete object.id;
  const cols = Object.keys(object)
      .map((e) => `${e}=?`);
  const updateStatement = `update ${table} set ${cols.join(',')} where ${table}.id = ?;`;
  const updateValues = Object.values(object);
  updateValues.push(id);
  await db.run(updateStatement, updateValues);
  await closeDB(db);
};


export const findByID = async (object : any, table : string) => {
  const db = await openDB();
  const select = `select * from ${table} where ${table}.id = ?`;
  const record = await db.get(select, object.id);
  await closeDB(db);
  return record;
};

export const fetch = async (table : string) => {
  const db = await openDB();
  const select = `select * from ${table};`;
  const results = await db.all(select);
  await closeDB(db);
  return results;
};
