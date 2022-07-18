import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./Components/App/App"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme 

import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";    
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

