import type { SchemaType, MenuType } from '../types/types'
const parseMenu = (response: Array<SchemaType>): Array<MenuType> => {
  let result = [
    {
      id: '1',
      name: 'Dashboard',
      url: '/',
      isVisible: true
    },
  ];
  response && response.map((val, idx: number) => {
    const menuItem = {
      id: `${val.name}${idx}`,
      name: `Manage ${val.name}`,
      url: `/crud/${val.name}`,
      isVisible: val.visible
    }
    result = [...result, menuItem];
  })
  const settingsItem = {
    id: '3',
    name: 'Settings',
    url: '/settings',
    isVisible: true
  }
  result = [...result, settingsItem];
  return result;
}

export default parseMenu;
