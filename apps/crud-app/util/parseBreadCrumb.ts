import type { BreadCrumbList } from '../types/types'

const parseMyBreadCrumb = (tableName: string, type?: string): Array<BreadCrumbList> => {
  let breadCrumbList: Array<BreadCrumbList>;
  breadCrumbList = [
    {
      id: 1,
      name: 'Home',
      url: '/',
      isSelected: false,
    },
    {
      id: 2,
      name: tableName,
      url: `/crud/${tableName}`,
      isSelected: !type,
    }
  ]
  if(!!type){
    breadCrumbList.push(
      {
        id: 3,
        name: type,
        url: `/crud/${tableName}/${type.toLowerCase()}`,
        isSelected: true,
      })
  }
  return breadCrumbList;
}

const parseBreadCrumb = (tableName: string) => {
  return parseMyBreadCrumb(tableName);
}

const parseBreadCrumbAdd = (tableName: string) => {
  return parseMyBreadCrumb(tableName, 'Add');
}

const parseBreadCrumbEdit = (tableName: string) => {
  return parseMyBreadCrumb(tableName, 'Edit');
}

export {
  parseBreadCrumb,
  parseBreadCrumbAdd,
  parseBreadCrumbEdit
} ;
