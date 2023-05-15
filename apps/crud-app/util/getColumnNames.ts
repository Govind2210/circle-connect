import type { Columns } from '../types/types'

const getColumns = (data: Array<Columns>, kind: string = ''): Array<string> => {
  return data && data.length > 0 && data[0].fields.filter((val) => !!val.visible && (kind !== '' ? val.kind === 'scalar' : true)).map((val) => val.name);
};

export default getColumns;