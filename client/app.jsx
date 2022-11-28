import React from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './global.css';
import catListFn from './components/cat-list';
import Layout from './layout';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import { UserProvider } from './context/userContext';

const CatList = catListFn();
const container =
  document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <UserProvider>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/:type" element={<AuthPage />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  </React.StrictMode>
);
