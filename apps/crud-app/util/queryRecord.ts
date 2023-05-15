const queryRecord = (tableName: string, columns: Array<string>): string => {
  const capitalizedTable = `${tableName.charAt(0).toUpperCase()}${tableName.slice(1)}`;
  const whereInput = `${capitalizedTable}WhereInput`
  let query = `query Query($findFirstWhere: ${whereInput}) { `;
  query += `findFirst${capitalizedTable}(where: $findFirstWhere) { `;
  query += columns.join(', ');
  query += ` } } `;
  return query;
}

export default queryRecord;
