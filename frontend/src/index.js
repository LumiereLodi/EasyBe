import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import WithStore from './component/WithStore';

ReactDOM.render(
  <React.StrictMode>
      <WithStore>
          <App />
      </WithStore>
  </React.StrictMode>,
  document.getElementById('root')
);

