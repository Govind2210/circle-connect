import React, { useState, useEffect, MouseEvent } from 'react';
import type { BreadCrumbList, SchemaType } from '../../types/types';
import { Breadcrumb } from '@proximity-crud-application/ui';
import useSettings from '../../hooks/useSettings';
import { TableIcon } from '@heroicons/react/outline';

const ADD: Array<BreadCrumbList> = [
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
    name: 'Add',
    url: '/settings/add',
  },
];

function Add() {
  const { add } = useSettings('/api/settings');
  const [addList, setAddList] = useState<Array<SchemaType>>([]);

  useEffect(() => {
    if (add && add.length > 0) {
      setAddList(add);
    }
  }, [add]);

  const handleClick = (
    tableName: string,
    fieldName: string,
    event: MouseEvent
  ) => {
    const target = event.target as HTMLInputElement;

    const modifiedList = addList.map((val) => {
      if (val.name.toLowerCase() === tableName.toLowerCase()) {
        const fields = val.fields.map((field) => {
          if (field.name.toLowerCase() === fieldName.toLowerCase()) {
            return {
              ...field,
              visible: !!target.checked,
            };
          }
          return {
            ...field,
          };
        });
        return {
          ...val,
          fields,
        };
      }
      return val;
    });
    setAddList(modifiedList);
  };

  useEffect(() => {
    if (addList && addList.length > 0) {
      fetch('/api/add', {
        method: 'post',
        body: JSON.stringify({ addList }),
      })
        .then((response) => response.json())
        .catch((err) => console.log(err));
    }
  }, [addList]);

  return (
    <div>
      <Breadcrumb menuList={ADD} />

      <h1 className="p-4 text-2xl border-b-2">Add Fields</h1>

      <dl className="p-4">
        {addList &&
          addList.map((val: SchemaType) => (
            <React.Fragment key={val.name}>
              <dt className="capitalize pt-4 flex cursor-pointer">
                <TableIcon className="w-6 h-6 mr-2" />
                {val.name.replace(/_/g,' ')}
              </dt>
              {val.fields &&
                val.fields.map((field) => (
                  <React.Fragment key={`${val.name}-${field.name}`}>
                    {!field.isId && !field.hasDefaultValue && (
                      <dd
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
                    )}
                  </React.Fragment>
                ))}
            </React.Fragment>
          ))}
      </dl>
    </div>
  );
}

export default Add;
