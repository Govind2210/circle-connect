import React, { FormEvent, useState } from 'react';
import { Breadcrumb, Input, Select } from '@proximity-crud-application/ui';
import { useRouter } from 'next/router';
import { useMutation } from 'urql';
import { SchemaType, Fields } from '../../../types/types';
import { client } from '../../../util/urqlClient';

import {
  parseBreadCrumbAdd,
  getColumns,
  mutationAddRecord,
  queryTableData,
  validateTableName,
} from '../../../util';

import settings from '../../../util/settings';

function Add({ tableData, filteredFields }) {
  const router = useRouter();
  const { table } = router.query;
  const [msg, setMsg] = useState('');

  const mutation = mutationAddRecord(
    table.toString(),
    getColumns(tableData, 'scalar')
  );
  const [, executePost] = useMutation(mutation);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const targetHtml = e.target as HTMLInputElement;
    const inputElements = targetHtml.querySelectorAll('input');
    const payload = {};
    inputElements.forEach((val) => (payload[val.name] = val.value));

    const selectElements = targetHtml.querySelectorAll('select');
    selectElements.forEach((val) => {
      const relation = val.name.split('-')
      payload[relation[0]] = {
        "connect": {
          [relation[1]]: isNaN(Number(val.value)) ? val.value : Number(val.value)
        }
      }
    });
    
    setMsg('Creating Record');
    executePost({
      createData: {
        ...payload,
      },
    });
    setMsg('Record Created: Redirecting to View Page');
    setTimeout(() => {
      setMsg('');
      router.push(`/crud/${table}`);
    }, 2000);
  };

  const verifyObject = (response: Fields) => {
    const relationExist = response.relationToFields?.length > 0;
    const relationDataExist = !!response[response.relationToFields.toString()];
    return relationExist && relationDataExist;
  };

  return (
    <div>
      <Breadcrumb menuList={parseBreadCrumbAdd(table && table.toString())} />
      <div className="flex justify-between mx-4 pt-4 pb-2 mb-4 border-b-2 items-center">
        <span className="text-2xl capitalize">Add {table.toString().replace(/_/g, ' ')}</span>
      </div>
      <div className="text-center mt-2 mb-2">{msg}</div>
      <form onSubmit={(e) => handleSubmit(e)} id="addForm">
        {filteredFields &&
          filteredFields.map((response: Fields) => (
            <React.Fragment key={response.name}>
              {!response.isReadOnly &&
                (response.kind === 'scalar' || verifyObject(response)) && (
                  <React.Fragment key={response.name}>
                    {response.kind === 'scalar' ? (
                      <Input
                        placeholder={`Enter ${response.name} here`}
                        label={response.name}
                        name={response.name}
                      />
                    ) : (
                      <Select
                        label={response.name}
                        list={response[response.relationToFields.toString()]}
                        name={`${response.name}_${response.relationName}-${response.relationToFields.toString()}`}
                        identifier={response.relationToFields.toString()}
                      />
                    )}
                  </React.Fragment>
                )}
            </React.Fragment>
          ))}

        {filteredFields && (
          <div className="flex">
            <button
              className="py-2 px-4 mx-4 transition-all border w-max capitalize rounded bg-blue-300 text-white hover:bg-blue-400 cursor-pointer"
              type="submit"
              name="addRecord"
            >
              + Add Record
            </button>
            <p
              className="py-2 px-4 mx-0 transition-all border w-max capitalize rounded bg-red-300 text-white hover:bg-red-400 cursor-pointer"
              onClick={() => router.push(`/crud/${table}`)}
            >
              Cancel
            </p>
          </div>
        )}
      </form>
    </div>
  );
}

export async function getServerSideProps(context) {
  let filteredFields: Array<Fields>;
  let tableData: Array<SchemaType>;
  if (context.params.table) {
    const result = await settings();
    const { add } = JSON.parse(result);

    tableData = add.filter(
      (val: SchemaType) => val.name === context.params.table.toString()
    );
    if (tableData) {
      filteredFields = tableData[0].fields.filter(
        (val: Fields) =>
          !val.isId && !val.hasDefaultValue && !!val.visible && !val.isReadOnly
      );
    }
    if (filteredFields && filteredFields.length > 0) {
      const modifiedFields = await Promise.all(
        filteredFields.map(async (val) => {
          if (
            val.relationFromFields?.length > 0 &&
            val.relationToFields?.length > 0
          ) {
            const fieldName = val.name.split('_')[0];
            const tableName = val.relationName.split('To')[1];
            const generatedQuery = queryTableData(tableName, [
              val.relationToFields.toString(),
            ]);
            const { data } = await client.query(generatedQuery).toPromise();
            const dropdownList = data[validateTableName(tableName)];
            return {
              ...val,
              name: fieldName,
              [val.relationToFields.toString()]: dropdownList,
            };
          }
          return val;
        })
      );
      filteredFields = modifiedFields;
    }
  }

  return {
    props: {
      tableData,
      filteredFields,
    },
  };
}

export default Add;
