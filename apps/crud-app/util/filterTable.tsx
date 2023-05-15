import type { SchemaType, FilterTableType } from '../types/types'

const filterTable = (schema: Array<SchemaType>, filter: Array<SchemaType>): FilterTableType => {
  const totalTable = schema && schema.map((val) => val.name) || []
  const filteredTable = filter && filter.map((val) => val.name) || []
  return {
    totalTable: totalTable.length,
    filteredTable: filteredTable.length
  }
};

export default filterTable;
