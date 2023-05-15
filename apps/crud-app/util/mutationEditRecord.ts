const mutationEditRecord = (tableName: string, columns: Array<string>): string => {
    const capitalizedTableName = `${tableName.charAt(0).toUpperCase()}${tableName.slice(1)}`
    let mutation = `mutation Mutation($updateData: ${capitalizedTableName}UpdateInput!, $updateWhere: ${capitalizedTableName}WhereUniqueInput!) { `
    mutation += `update${capitalizedTableName}(data: $updateData, where: $updateWhere) { `
    mutation += columns.join(', ');
    mutation += ` } } `
    return mutation;
  }
  
  export default mutationEditRecord;
  