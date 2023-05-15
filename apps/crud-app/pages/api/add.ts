import fs from 'fs'
import path from 'path'
import { tmpdir } from 'os';

export default async function handler(req, res) {
  const body = JSON.parse(req.body)
  fs.writeFileSync(path.resolve(tmpdir(), 'table_data/add.json'), JSON.stringify(body.addList))
  return res.json(body.addList)
}
