import React, { useState, useEffect } from 'react';
import { Breadcrumb, Toggle } from '@proximity-crud-application/ui';
import { ReactSortable } from 'react-sortablejs';
import useSettings from '../../hooks/useSettings';
import type { SchemaType, BreadCrumbList } from '../../types/types';
import { MenuIcon } from '@heroicons/react/outline';

const SIDEBAR: Array<BreadCrumbList> = [
  {
    id: 1,
    isSelected: false,
    name: 'Home',
    url: '/',
  },
  {
    id: 2,
    isSelected: false,
    name: 'Settings',
    url: '/settings',
  },
  {
    id: 3,
    isSelected: true,
    name: 'Sidebar',
    url: '/settings/sidebar',
  },
];


function Sidebar() {
  const { sidebar } = useSettings('/api/settings');
  const [sidebarList, setSidebarList] = useState<Array<SchemaType>>([]);

  useEffect(() => {
    if (sidebar && sidebar.length > 0) {
      setSidebarList(sidebar);
      console.log(sidebar)
    }
  }, [sidebar]);

  useEffect(() => {
    if (sidebarList && sidebarList.length > 0) {
      fetch('/api/sidebar', {
        method: 'post',
        body: JSON.stringify({ sidebarList }),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    }
  }, [sidebarList]);

  const handleVisibility = (visibility: boolean, tableName: string) => {
    const modifiedList = sidebarList.map((val) => {
      if(val.name.toLowerCase() === tableName){
        return {
          ...val,
          visible: visibility
        }
      }
      return val
    })
    setSidebarList(modifiedList)
  }

  return (
    <div>
      <Breadcrumb menuList={SIDEBAR} />

      <h1 className="p-4 text-2xl border-b-2">SideBar List</h1>
      <ReactSortable
        list={sidebarList}
        setList={setSidebarList}
        className="flex gap-2 flex-col m-2"
      >
        {sidebarList.map((item) => (
          <div
            className="flex p-2 border rounded-md bg-white cursor-move capitalize justify-between"
            key={item.id}
          >
            <div className="flex items-center">
              <MenuIcon className="mr-4 flex-shrink-0 h-6 w-6" />
              {item.name.replace(/_/g, ' ')}
            </div>
            <div className="flex items-center justify-center mr-4">
              <Toggle 
                id={item.id}
                isSelected={item.visible}
                value={(val: boolean) => handleVisibility(val, item.name)}
              />
            </div>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
}

export default Sidebar;
