import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { Provider } from 'urql';
import { client, parseMenu } from '../util';

import Head from 'next/head';
import {
  Header,
  Footer,
  Sidebar,
  ContentLayout,
} from '@proximity-crud-application/ui';

import 'tailwindcss/tailwind.css';
import useSettings from '../hooks/useSettings';

function CustomApp({ Component, pageProps }: AppProps) {
  const [navigation, setNavigation] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { sidebar } = useSettings('/api/settings');

  useEffect(() => {
    if (sidebar && sidebar.length > 0) {
      const menu = parseMenu(sidebar);
      setNavigation(menu);
    }
  }, [sidebar]);

  return (
    <Provider value={client}>
      <Head>
        <title>Welcome to {process.env.NEXT_PUBLIC_APP_NAME}!</title>
      </Head>
      <div className="h-screen-custom flex overflow-hidden">
        <Sidebar
          menus={navigation}
          sidebar={sidebarOpen}
          setSidebar={(bool: boolean) => setSidebarOpen(bool)}
        />
        <div className="flex flex-col w-0 flex-1 overflow-hidden">
          <Header
            logoText="Crud Application"
            sidebar={sidebarOpen}
            setSidebar={(bool: boolean) => setSidebarOpen(bool)}
          />
          <main className="flex-1 relative overflow-y-auto focus:outline-none">
            <ContentLayout>
              <Component {...pageProps} />
            </ContentLayout>
          </main>
        </div>
      </div>
      <Footer copyrightText="Made with &#9825;" className="cursor-pointer" />
    </Provider>
  );
}

export default CustomApp;
