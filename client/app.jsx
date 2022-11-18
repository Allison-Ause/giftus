import React from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './global.css';
import catListFn from './components/cat-list';
import dashboardFn from './components/dashboard';
import Layout from './layout';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import AuthPage from './components/AuthPage';

const CatList = catListFn();
const Dashboard = dashboardFn();
const container =
  document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/auth/:type" element={<AuthPage />} />
          <Route path="cats" element={<CatList />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
