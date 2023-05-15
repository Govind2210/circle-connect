import { useState, useEffect } from 'react';
import { useQuery, useMutation } from 'urql';
import {
  SchemaType,
  TableDataVariableType,
  Fields,
} from '../../../types/types';
import Router, { useRouter } from 'next/router';
import _ from 'lodash';

import {
  Breadcrumb,
  TableView,
  Pagination,
  Filter,
  TableSkeleton
} from '@proximity-crud-application/ui';
import { GET_MENU_LIST } from '../../../constants/APIS';
import {
  parseBreadCrumb,
  queryTableData,
  mutationDeleteTableData,
  getColumns,
  validateTableName,
} from '../../../util';
import useSettings from '../../../hooks/useSettings';

function Index({ table, columns: allColumns }) {
  const router = useRouter();
  const { page = 1, searchText, searchType } = router.query;
  const { view } = useSettings('/api/settings');
  const [columns, setColumns] = useState(allColumns);
  const [filterType, setFilterType] = useState('');
  const [filterText, setFilterText] = useState('');

  const variables: TableDataVariableType = {
    take: 10,
    skip: (Number(page) - 1) * 10,
    orderBy: {
      [getColumns(columns) && getColumns(columns)[0]]: 'desc',
    },
  };

  if (searchText && searchType) {
    let search = columns[0];
    if (columns[0].name !== table) {
      search = allColumns[0];
    }
    const typeData = search.fields.filter(
      (val: Fields) => val.name === searchType
    );
    const type = typeData && typeData[0].type.toLowerCase();
    variables.where = {
      [searchType as string]: {
        [`${type === 'string' ? 'contains' : 'equals'}`]:
          type === 'string' ? searchText : Number(searchText),
      },
    };
  }

  const [msg, setMsg] = useState('');
  const [pause, setPause] = useState(true);

  const query = queryTableData(table, getColumns(columns, 'scalar'));
  const [result] = useQuery({
    query,
    pause,
    variables,
  });

  const mutation = mutationDeleteTableData(table, getColumns(columns)[0]);
  const [, executePost] = useMutation(mutation);

  useEffect(() => {
    setColumns(allColumns);
    setPause(true);
  }, [allColumns]);

  useEffect(() => {
    if (view && view.length > 0) {
      const modifiedColumns =
        view && view.filter((val: SchemaType) => val.name === table);
      if (!_.isEqual(modifiedColumns, columns)) {
        setColumns(modifiedColumns);
      }
      setPause(false);
    }
  }, [columns, table, view]);

  useEffect(() => {
    if (view && view.length > 0) {
      const modifiedColumns =
        view && view.filter((val: SchemaType) => val.name === table);
      setColumns(modifiedColumns);
      setPause(false);
    }
  }, [view, table]);

  const { data, fetching, error } = result;

  if (error) {
    return 'Error Occured';
  }

  const handleEdit = (id: number | string) => {
    Router.push(`${table}/edit/${id}`);
  };

  const handleDelete = (id: number | string) => {
    setMsg('Deleting Record');
    executePost({
      deleteWhere: {
        [getColumns(columns)[0]]: id,
      },
    })
      .then((res) => {
        console.log(res);
        setMsg('Record Deleted');
        setTimeout(() => setMsg(''), 1000);
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (eventName: 'next' | 'prev') => {
    let routeQuery = '';
    let pageQuery: number;
    switch (eventName) {
      case 'next':
        pageQuery = Number(page) + 1;
        routeQuery = `${table}?page=${pageQuery}`;
        if (searchText && searchType) {
          routeQuery += `&searchText=${filterText}&searchType=${filterType}`;
        }
        Router.push(routeQuery);
        break;
      case 'prev':
        pageQuery = Number(page) > 1 ? Number(page) - 1 : 1;
        routeQuery = `${table}?page=${pageQuery}`;
        if (searchText && searchType) {
          routeQuery += `&searchText=${filterText}&searchType=${filterType}`;
        }
        Router.push(routeQuery);
        break;
      default:
        console.log('default');
    }
  };

  const handleFilterText = (text: string) => {
    setFilterText(text);
  };

  const handleFilterType = (type: string) => {
    setFilterType(type);
  };

  return (
    <div>
      <Breadcrumb menuList={parseBreadCrumb(table)} />
      <div className="flex justify-between mx-4 pt-4 pb-2 border-b-2 items-center">
        <span className="text-2xl capitalize">Manage {table.replace(/_/g, ' ')}</span>
        <span
          className="py-2 px-4 transition-all border capitalize rounded bg-blue-300 text-white hover:bg-blue-400 cursor-pointer"
          onClick={() => Router.push(`${table}/add`)}
        >
          + Add {table.replace(/_/g, ' ')}
        </span>
      </div>
      <div className="text-center pb-2 pt-2">{msg}</div>
      <Filter
        columns={getColumns(columns, 'scalar')}
        text={filterText}
        type={filterType}
        filterText={(text: string) => handleFilterText(text)}
        filterType={(type: string) => handleFilterType(type)}
        onSubmit={() =>
          Router.push(
            `${table}?page=${page}&searchText=${filterText}&searchType=${filterType}`
          )
        }
      />
      {fetching ? (
        <TableSkeleton />
      ) : (
        <>
          <TableView
            schema={view}
            columns={columns && columns[0].fields}
            className="pt-0 mt-0"
            data={data && data[validateTableName(table)]}
            onEdit={(id: number | string) => handleEdit(id)}
            onDelete={(id: number | string) => handleDelete(id)}
          />
          <Pagination
            page={Number(page)}
            onNext={() => handleClick('next')}
            onPrev={() => handleClick('prev')}
          />
        </>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  let paths = [];
  const res = await fetch(GET_MENU_LIST);
  const jsonData = await res.json();

  jsonData.map((val: SchemaType) => {
    const subpath = {
      params: {
        table: val.name,
      },
    };
    paths = [...paths, subpath];
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { table } }) {
  const res = await fetch(GET_MENU_LIST);
  const jsonData = await res.json();
  const columns =
    jsonData && jsonData.filter((val: SchemaType) => val.name === table);

  return {
    props: {
      table,
      columns,
    },
  };
}

export default Index;
