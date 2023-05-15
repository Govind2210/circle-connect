import validateTableName from './validateTableName'
const queryTableData = (table: string, columns: Array<string>): string => {
    let query = '';
    const tableName = validateTableName(table);   
    const capitalizedTableName = `${table.charAt(0).toUpperCase()}${table.slice(1)}`
    query = `query Query ($take: Int, $skip: Int, $where: ${capitalizedTableName}WhereInput,$orderBy: [${capitalizedTableName}OrderByInput!]) { ${tableName} (take: $take, skip: $skip, where: $where, orderBy: $orderBy) { `;
    query += columns.join(', ');
    query += ' } }'; 
    return query
}

export default queryTableData;
