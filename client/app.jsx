import React from 'react';
import { createRoot } from 'react-dom/client';
import './reset.css';
import './global.css';
import {
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import AuthPage from './components/AuthPage';
import HomePage from './components/HomePage';
import { UserProvider } from './context/userContext';
import { ChakraProvider } from '@chakra-ui/react';
import GiftDetailPage from './components/GiftDetailPage.js';
import GiftDisplayPage from './components/GiftDisplayPage.js';
import FriendDisplayPage from './components/FriendDisplayPage.js';
import FriendFormPage from './components/FriendFormPage.js';
import FriendDetailPage from './components/FriendDetailPage.js';

const container =
  document.getElementById('app') || document.createElement('div');
container.id = 'app';
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/:type" element={<AuthPage />} />
            <Route path="/friends" element={<FriendDisplayPage />} />
            <Route path="/friends/new" element={<FriendFormPage />} />
            <Route
              path="/friends/:id"
              element={<FriendDetailPage />}
            />
            <Route path="/gifts" element={<GiftDisplayPage />} />
            <Route path="/gifts/:id" element={<GiftDetailPage />} />
          </Routes>
        </Router>
      </UserProvider>
    </ChakraProvider>
  </React.StrictMode>
);
