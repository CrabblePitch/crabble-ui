import './main.scss';
import '../installSesLockdown';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.jsx';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import { Home } from "./pages/Home/Home.jsx";

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
            main: '#1c1b1f',
            contrastText: '#e5e1e6'
        },
        line: {
            main: '#918f9a'
        },
        onSurface: {
            main: '#2c2c44'
        }
    }
})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
            {/*<NavPanel toggleModal={console.log} toggleBag={console.log} bagOpen={console.log} />*/}

            {/*<Album/>*/}
        </ThemeProvider>

    </React.StrictMode>,
);
