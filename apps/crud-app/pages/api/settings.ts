import fs from 'fs'
import path from 'path'
import { GET_MENU_LIST } from '../../constants/APIS'
import _ from 'lodash';
import { tmpdir } from 'os';
import type { SchemaType } from '../../types/types'

const reset = (schema: Array<SchemaType>) => {
  fs.writeFileSync(path.resolve(tmpdir(), 'table_data/schema.json'), JSON.stringify(schema))
  fs.writeFileSync(path.resolve(tmpdir(), 'table_data/sidebar.json'), JSON.stringify(schema))
  fs.writeFileSync(path.resolve(tmpdir(), 'table_data/view.json'), JSON.stringify(schema))
  fs.writeFileSync(path.resolve(tmpdir(), 'table_data/add.json'), JSON.stringify(schema))
  fs.writeFileSync(path.resolve(tmpdir(), 'table_data/edit.json'), JSON.stringify(schema))
  return {
    schema,
    sidebar: schema,
    view: schema,
    add: schema,
    edit: schema
  }
}

export default async function handler(req, res) {
  const response = await fetch(GET_MENU_LIST);
  const schema = await response.json();
  const dir = path.resolve(tmpdir(), 'table_data')

  if(!fs.existsSync(dir)) {
    fs.mkdirSync(path.resolve(tmpdir(), 'table_data'));
  }

  if(fs.existsSync(path.resolve(tmpdir(), 'table_data/schema.json'))){
    const availableSchema = JSON.parse(fs.readFileSync(path.resolve(tmpdir(), 'table_data/schema.json')).toString())
    const schemaVerified = _.isEqual(schema, availableSchema)
    if(schemaVerified) {
      const sidebar = JSON.parse(fs.readFileSync(path.resolve(tmpdir(), 'table_data/sidebar.json')).toString())
      const view = JSON.parse(fs.readFileSync(path.resolve(tmpdir(), 'table_data/view.json')).toString())
      const add = JSON.parse(fs.readFileSync(path.resolve(tmpdir(), 'table_data/add.json')).toString())
      const edit = JSON.parse(fs.readFileSync(path.resolve(tmpdir(), 'table_data/edit.json')).toString())
      return res.json({
        schema,
        sidebar,
        view,
        add,
        edit
      })
    } else {
      return res.json(reset(schema))
    }
  } else {
    return res.json(reset(schema))
  }

}

