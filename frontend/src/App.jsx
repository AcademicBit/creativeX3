import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import UserList from './components/UserList';
import UserDetails from './components/UserDetails';
import UserManagement from './components/UserManagement';
import './styles/styles.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF8C00',
      dark: '#FF7000',
    },
    secondary: {
      main: '#1E1E1E',
    },
    background: {
      default: '#000000',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#888888',
    }
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
    button: {
      textTransform: 'none',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1E1E1E',
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#333',
            },
            '&:hover fieldset': {
              borderColor: '#444',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FF8C00',
            },
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <div style={{ paddingTop: '64px' }}>
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/usuarios" element={<UserManagement />} />
            <Route path="/eventos" element={<div>Página de Eventos</div>} />
            <Route path="/usuario/:id" element={<UserDetails />} />
            <Route path="/usuarios/:id" element={<UserDetails />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
