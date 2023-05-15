import React, { FormEvent, useState } from 'react';
import { Breadcrumb, Input, Select } from '@proximity-crud-application/ui';
import { useRouter } from 'next/router';

import { SchemaType, Fields } from '../../../../types/types';
import { useQuery, useMutation } from 'urql';
import { client } from '../../../../util/urqlClient';

import {
  parseBreadCrumbEdit,
  getColumns,
  queryRecord,
  mutationEditRecord,
  queryTableData,
  validateTableName,
} from '../../../../util';

import settings from '../../../../util/settings';

function Edit({ fields, query, filteredFields, tableData }) {
  const router = useRouter();
  const { id, table } = router.query;
  const [msg, setMsg] = useState('');
  const [result] = useQuery({
    query: query,
    variables: {
      findFirstWhere: {
        [fields && fields.length > 0 && fields[0].name]: {
          equals: isNaN(Number(id)) ? id : Number(id),
        },
      },
    },
  });

  const mutation = mutationEditRecord(
    table.toString(),
    getColumns(tableData, 'scalar')
  );
  const [, executePost] = useMutation(mutation);

  const parseData = (response) => {
    const capitalizedTableName = `${table
      .toString()
      .charAt(0)
      .toUpperCase()}${table.toString().slice(1)}`;
    return response[`findFirst${capitalizedTableName}`];
  };

  const { data, fetching, error } = result;

  if (fetching) {
    return 'Loading';
  }
  if (error) {
    return 'Error Occured';
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const targetHtml = e.target as HTMLInputElement;
    const inputElements = targetHtml.querySelectorAll('input');
    const payload = {};
    inputElements.forEach((val) => (payload[val.name] = { set: val.value }));

    const selectElements = targetHtml.querySelectorAll('select');
    selectElements.forEach((val) => {
      const relation = val.name.split('-')
      payload[relation[0]] = {
        "connect": {
          [relation[1]]: isNaN(Number(val.value)) ? val.value : Number(val.value)
        }
      }
    });

    setMsg('Updating Record');
    executePost({
      updateData: {
        ...payload,
      },
      updateWhere: {
        [fields && fields.length > 0 && fields[0].name]: isNaN(Number(id))
          ? id
          : Number(id),
      },
    });
    setMsg('Record Updated: Redirecting to View Page');

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
      <Breadcrumb menuList={parseBreadCrumbEdit(table && table.toString())} />
      <div className="flex justify-between mx-4 mb-4 pt-4 pb-2 border-b-2 items-center">
        <span className="text-2xl capitalize">Edit {table.toString().replace(/_/g,' ')}</span>
      </div>
      <div className="text-center mt-2 mb-2">{msg}</div>
      <form onSubmit={(e) => handleSubmit(e)}>
        {filteredFields &&
          filteredFields.map((response: Fields, idx: number) => (
            <React.Fragment key={`${response.name}-${idx}`}>
              {!response.isReadOnly &&
                (response.kind === 'scalar' || verifyObject(response)) && (
                  <React.Fragment>
                    {response.kind === 'scalar' ? (
                      <Input
                        placeholder={`Enter ${response.name} here`}
                        label={response.name}
                        value={parseData(data)[response.name]}
                        name={response.name}
                      />
                    ) : (
                      <>
                      <Select
                        label={response.name}
                        list={response[response.relationToFields.toString()]}
                        name={`${response.name}_${
                          response.relationName
                        }-${response.relationToFields.toString()}`}
                        value={parseData(data)[response.name]}
                        identifier={response.relationToFields.toString()}
                      />
                      </>
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
              name="editRecord"
            >
              Edit Record
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
  const table = context.params.table;
  const result = await settings();
  const { edit } = JSON.parse(result);

  const tableData = edit.filter(
    (val: SchemaType) => val.name === table.toString()
  );
  const columns = getColumns(tableData, 'scalar');
  const generatedRecordQuery = queryRecord(table.toString(), columns);

  let filteredFields: Array<Fields> = [];
  if (tableData) {
    filteredFields = tableData[0].fields.filter(
      (val: Fields) => !val.isId && !val.hasDefaultValue && !!val.visible
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

  return {
    props: {
      query: generatedRecordQuery,
      filteredFields: filteredFields,
      fields: tableData[0].fields,
      tableData,
    },
  };
}

export default Edit;
