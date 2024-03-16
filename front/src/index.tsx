import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './pages/index/Main';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Add from './pages/data/Add';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './AppContext';
// eslint-disable-next-line node/no-unpublished-import
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import PrivateRoutes  from './auth/privateroutes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path ="/" element={<Main />} />
          <Route path="/add" element={<Add />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </AppProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
