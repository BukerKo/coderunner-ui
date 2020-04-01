import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import  {ThemeProvider} from './Context/ThemeContext';

ReactDOM.render(<Router>
  <ThemeProvider>
  <App/>
  </ThemeProvider>
</Router>, document.getElementById('root'));
