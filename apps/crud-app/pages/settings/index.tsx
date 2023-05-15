import { FormEvent, useState } from 'react';
import Router from 'next/router';
import { Breadcrumb, Input, Card } from '@proximity-crud-application/ui';
import type { BreadCrumbList } from '../../types/types';
import useSettings from '../../hooks/useSettings';
import { filterTable } from '../../util';

const SETTINGS: Array<BreadCrumbList> = [
  {
    id: 1,
    isSelected: false,
    name: 'Home',
    url: '/',
  },
  {
    id: 2,
    isSelected: true,
    name: 'Settings',
    url: '/settings',
  },
];

export function Settings() {
  const [msg, setMsg] = useState<string>('');
  const { schema, sidebar, view, add, edit } = useSettings('/api/settings');

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    let requiredValidation = true;
    target.querySelectorAll('input').forEach((val) => {
      if (!val.value) {
        requiredValidation = false;
        setMsg(`${val.name} cannot be left blank`);
        setTimeout(() => {
          setMsg('');
        }, 2000);
      }
    });
    if (requiredValidation) {
      setMsg('');
    }
  };

  const handleClick = (url: string) => {
    Router.push(url);
  };

  return (
    <div>
      <Breadcrumb menuList={SETTINGS} />
      <div className="py-6">
        {schema && schema.length > 0 && (
          <div className="m-4 mb-8 flex gap-4 flex-wrap justify-center">
            <Card
              title="SideBar"
              totalTable={filterTable(schema, sidebar).totalTable}
              tableVisible={filterTable(schema, sidebar).filteredTable}
              onClick={() => handleClick('settings/sidebar')}
              className="lg:w-23p w-full sm:w-48p"
            />
            <Card
              title="View"
              totalTable={filterTable(schema, view).totalTable}
              tableVisible={filterTable(schema, view).filteredTable}
              onClick={() => handleClick('settings/view')}
              className="lg:w-23p w-full sm:w-48p"
            />
            <Card
              title="Add"
              totalTable={filterTable(schema, add).totalTable}
              tableVisible={filterTable(schema, add).filteredTable}
              onClick={() => handleClick('settings/add')}
              className="lg:w-23p w-full sm:w-48p"
            />
            <Card
              title="Edit"
              totalTable={filterTable(schema, edit).totalTable}
              tableVisible={filterTable(schema, edit).filteredTable}
              onClick={() => handleClick('settings/edit')}
              className="lg:w-23p w-full sm:w-48p"
            />
          </div>
        )}

        <hr />

        <div className="m-4 pb-4 border">
          <p className="px-4 pt-4 pb-2 text-xl">
            <span className="underline">Database Settings&nbsp;</span> <span className="text-red-500">(Planned for Phase 3)</span>
          </p>
          <form onSubmit={(e) => handleForm(e)}>
            <Input
              label="Connection URL"
              name="connection_url"
              placeholder="Enter Database Connection URL"
              type="text"
            />
            <Input
              label="Provider"
              name="db_provider"
              placeholder="mysql / postgresql / sqlite"
              type="text"
              value="postgresql"
              className="mb-0"
            />
            <p className="capitalize text-red-500 pb-2 px-4">
              {msg && `*${msg.replace(/_/g, ' ')}`}
            </p>
            <button
              type="submit"
              className="px-4 py-2 border rounded mx-4 hover:bg-blue-500 hover:text-white transition-all"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Settings;
