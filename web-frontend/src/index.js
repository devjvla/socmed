import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/stylesheets/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Redux */
import { Provider } from "react-redux";
import { store } from './store/index';

/* Import Pages */
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

/* Google OAuth */
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  </GoogleOAuthProvider>
);
