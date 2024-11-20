import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './i18n';
import {SnackbarProvider} from "notistack";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SnackbarProvider>
        <App />
    </SnackbarProvider>
);
