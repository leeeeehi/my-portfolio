import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import PortfolioProvider from './context/PortfolioProvider.jsx';
import ThemeModeProvider from './context/ThemeModeProvider.jsx';
import theme from './theme.js';
import 'pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css';
import '@fontsource/black-han-sans/400.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ThemeModeProvider>
          <PortfolioProvider>
            <App />
          </PortfolioProvider>
        </ThemeModeProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
