import React from 'react';
import ReactDOM from 'react-dom';
import { Theme } from '@openmined/omui';

import App from './App';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Theme>
    <App />
  </Theme>,
  rootElement
);