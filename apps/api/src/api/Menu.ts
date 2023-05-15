var express = require('express');
var router = express.Router();
import { Prisma } from '@proximity-crud-application/prisma-client';
import getFields from '../utility/getFields';

export interface TableDataFields {
  name: string;
  type: string;
  hasDefaultValue: boolean;
  isId: boolean;
  visible: boolean;
  kind: string;
  isList: boolean;
  isReadOnly: boolean;
  relationName: string;
  relationFromFields: Array<string>,
  relationToFields: Array<string>,
}

export interface TableDataType {
  id: number;
  name: string;
  fields: Array<TableDataFields>;
  visible: boolean;
}

router.get('/getList', function (req, res) {
  const dataModels = Prisma.dmmf.datamodel.models;
  const tableData: Array<TableDataType> = dataModels.map((val, idx) => {
    return {
      id: idx + 1,
      name: val.name,
      fields: getFields(val.fields),
      visible: true
    }
  })
  res.send(tableData)
});

export default router;
