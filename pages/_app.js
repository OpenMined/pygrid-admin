import React from 'react';
import { Theme } from '@openmined/omui';

import Header from '../components/Header';

import '../styles/globals.css';

const Layout = ({ children }) => (
  <div className="layout">
    <Header />
    {children}
  </div>
);

// const Layout = ({ children }) => <div className="layout">{children}</div>

function PyGridAdmin({ Component, pageProps }) {
  return (
    <Theme>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Theme>
  );
}

export default PyGridAdmin;
