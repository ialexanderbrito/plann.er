import React from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@/app';
import { Toaster } from '@/components/ui/toaster';

import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
);
