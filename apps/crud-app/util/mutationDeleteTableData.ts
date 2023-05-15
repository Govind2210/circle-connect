const mutationDeleteTableData = (table: string, id: string | number): string => {
  const capitalizedTable = `${table.charAt(0).toUpperCase()}${table.slice(1)}`; 
  const uniqueInput = `${capitalizedTable}WhereUniqueInput`
  let mutation = `mutation Mutation($deleteWhere: ${uniqueInput}!) { `
  mutation += `delete${capitalizedTable}(where: $deleteWhere) { `;
  mutation += ` ${id} `;
  mutation += ` } } `;
  return mutation;
}

export default mutationDeleteTableData;