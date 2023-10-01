import './main.scss';
import '../installSesLockdown.js';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#3d3c8f',
            contrastText: '#e2dfff'
        },
        secondary: {
            main: '#87006d',
            contrastText: '#ffd8ed'
        },
        error: {
            main: '#93000a',
            contrastText: '#ffdad6'
        },
        tertiary: {
            main: '#871e2a',
            contrastText: '#ffdad9'
        },
        surface: {
            main: '#2c2c44',
            contrastText: '#e5e1e6'
        },
        surfaceDark: {
          main: '#1C1B1F'
        },
        line: {
            main: '#918f9a'
        },
        onSurface: {
            main: '#e5e1e6'
        },
        onSurfaceText: {
            main: '#e5e1e6'
        },
        onSurfaceTextDark: {
            main: '#918f9a',
            light: '#918f9a',
            dark: '#918f9a',
            contrastText: '#918f9a',
        },
        altText: {
            main: '#e4e1ec'
        },
        container: {
            main: '#e6dff9'
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <App />
            </ThemeProvider>
        </StyledEngineProvider>

    </React.StrictMode>,
);
