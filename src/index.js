import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Mycontext from './mycontext';

ReactDOM.render(
  <React.StrictMode>
    <Mycontext>
        <App />
    </Mycontext>
    
  </React.StrictMode>,
  document.getElementById('root')
);
