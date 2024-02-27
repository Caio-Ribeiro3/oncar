import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';

import './index.css';
import reportWebVitals from './reportWebVitals';

import DashboardRoot, { loader as rootLoader } from './routes/dashboard/root';
import DashboardCarRoute, { loader as carLoader, action as carAction } from './routes/dashboard/car';
import AppHomepageCarRoute, { loader as appHomepageLoader, action as appHomepageAction } from './routes/app/homepage';
import AppSingleCarRoute, { loader as appSingleCarLoader, action as appSingleCarAction } from './routes/app/single-car';

const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: <DashboardRoot />,
    loader: rootLoader,
    children: [
      {
        path: "car",
        loader: carLoader,
        action: carAction,
        element: <DashboardCarRoute />
      },
    ]
  },
  {
    path: "/app",
    element: <AppHomepageCarRoute />,
    loader: appHomepageLoader,
    action: appHomepageAction,
  },
  {
    path: "/app/car/:id",
    loader: appSingleCarLoader,
    action: appSingleCarAction,
    element: <AppSingleCarRoute />
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
