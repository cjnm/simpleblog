import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Container, NextUIProvider } from '@nextui-org/react';
import App from './App';
import Login from './Login';
import SimpleBlog from './pages/SimpleBlog';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NextUIProvider>
      <Container fluid>
        <SimpleBlog />
      </Container>
    </NextUIProvider>
  </React.StrictMode>
);
