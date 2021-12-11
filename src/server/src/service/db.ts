

export const insert = (object : any, table : string) => {
  const cols = Object.keys(object);
  const insetstm = `insert into "${table}" (${cols.join(',')}) values (${cols.map((e) => `${'$'+e}`).join(',')});`;
  return insetstm;
};

export const update = (object : any, table : string) => {
  const id = object.id;
  delete object.id;
  const cols = Object.keys(object)
      .map((e) => `${e}=?`);
  const updateStatement = `update ${table} set ${cols.join(',')} where ${table}.id = ?;`;
  const updateValues = Object.values(object);
  updateValues.push(id);
  return {updateStatement, values: updateValues};
};


