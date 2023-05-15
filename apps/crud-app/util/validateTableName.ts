const validateTableName = (table:string): string => {
    if(table && table.slice(-2).toLowerCase() === 'ss'){
        return `${table}es`;
    }
    else if(table && table.slice(-1).toLowerCase() === 'y'){
        return `${table.substring(0, table.length - 1)}ies`;
    }
    else if(table && table.slice(-1).toLowerCase() !== 's'){
        return `${table}s`;
    } else {
        return `findMany${table.charAt(0).toUpperCase()}${table.slice(1)}`;
    }
}

export default validateTableName;
