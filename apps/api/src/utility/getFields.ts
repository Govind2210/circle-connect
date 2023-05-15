import { Prisma } from '@proximity-crud-application/prisma-client'
import type { TableDataFields } from '../api/Menu'

const getFields = (fields: Array<Prisma.DMMF.Field>): Array<TableDataFields> => {
  return fields.map(val => {
    return {
      name: val.name,
      type: val.type,
      hasDefaultValue: val.hasDefaultValue,
      isId: val.isId,
      visible: true,
      kind: val.kind,
      isList: val.isList,
      relationName: val.relationName,
      relationFromFields: val.relationFromFields,
      relationToFields: val.relationToFields,
      isReadOnly: val.isReadOnly
    }
  });
}

export default getFields;