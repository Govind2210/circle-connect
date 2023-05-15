import React, { useState, useEffect, MouseEvent } from 'react';
import type { SchemaType, BreadCrumbList } from '../../types/types';
import { Breadcrumb } from '@proximity-crud-application/ui';
import useSettings from '../../hooks/useSettings';
import { TableIcon } from '@heroicons/react/outline';

const VIEW: Array<BreadCrumbList> = [
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
    name: 'View',
    url: '/settings/view',
  },
];

function View() {
  const { view } = useSettings('/api/settings');
  const [viewList, setViewList] = useState<Array<SchemaType>>([]);

  useEffect(() => {
    if (view && view.length > 0) {
      setViewList(view);
    }
  }, [view]);

  useEffect(() => {
    if (viewList && viewList.length > 0) {
      fetch('/api/view', {
        method: 'post',
        body: JSON.stringify({ viewList }),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    }
  }, [viewList])

  const handleClick = (tableName: string, fieldName: string, event: MouseEvent) => {
    const target = event.target as HTMLInputElement

    const modifiedList = viewList.map((val) => {
      if(val.name.toLowerCase() === tableName.toLowerCase()){
        const fields = val.fields.map((field) => {
          if(field.name.toLowerCase() === fieldName.toLowerCase()){
            return {
              ...field,
              visible: !!target.checked
            }
          }
          return {
            ...field
          }
        })
        return {
          ...val,
          fields
        }
      }
      return val
    })
    setViewList(modifiedList)
  }

  return (
    <div>
      <Breadcrumb menuList={VIEW} />
      <h1 className="p-4 text-2xl border-b-2">View Columns</h1>

      <dl className="p-4">
        {viewList &&
          viewList.map((val: SchemaType) => (
            <React.Fragment key={val.name}>
              <dt className="capitalize pt-4 flex cursor-pointer">
                <TableIcon className="w-6 h-6 mr-2" />
                {val.name.replace(/_/g, ' ')}
              </dt>
              {val.fields &&
                val.fields.map((field) => (
                  <dd
                    key={`${val.name}-${field.name}`}
                    className={`px-8 capitalize flex items-center transition-all`}
                  >
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      defaultChecked={field.visible}
                      onClick={(e) => handleClick(val.name, field.name, e)}
                    />
                    {field.name.replace(/_/g, ' ')}
                  </dd>
                ))}
            </React.Fragment>
          ))}
      </dl>
    </div>
  );
}

export default View;
