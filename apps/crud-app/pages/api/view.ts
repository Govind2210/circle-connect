import fs from 'fs'
import path from 'path'
import { tmpdir } from 'os';

export default async function handler(req, res) {
  const body = JSON.parse(req.body)
  fs.writeFileSync(path.resolve(tmpdir(), 'table_data/view.json'), JSON.stringify(body.viewList))
  return res.json(body.viewList)
}
