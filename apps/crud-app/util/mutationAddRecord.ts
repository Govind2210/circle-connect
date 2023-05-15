const mutationAddRecord = (tableName: string, columns: Array<string>): string => {
  const capitalizedTableName = `${tableName.charAt(0).toUpperCase()}${tableName.slice(1)}`
  let mutation = `mutation Mutation($createData: ${capitalizedTableName}CreateInput!) { `
  mutation += `create${capitalizedTableName}(data: $createData) { `
  mutation += columns.join(', ');
  mutation += ` } } `
  return mutation;
}

export default mutationAddRecord;
