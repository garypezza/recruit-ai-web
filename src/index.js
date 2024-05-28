import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { createRoot } from 'react-dom/client';
import AdminPanel from './components/AdminPanel';
import Sidebar from './components/Sidebar';
import ViewStudent from './components/ViewStudent';
import Layout from './components/Layout';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import { StudentProvider } from './context/StudentContext';
import { ModalProvider } from './context/ModalContext';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  // your theme options
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ModalProvider>
      <AuthProvider>
        <Router>
          <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <StudentProvider>
              <Layout>
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                  <Routes>
                    <Route path="/" element={
                      <PrivateRoute>
                        <ViewStudent />
                      </PrivateRoute>}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route
                      path="/student/"
                      element={
                        <PrivateRoute>
                          <ViewStudent />
                        </PrivateRoute>
                      }
                    />
                    <Route
                      path="/admin"
                      element={
                        <PrivateRoute>
                          <AdminPanel />
                        </PrivateRoute>
                      }
                    />
                  </Routes>
                </Box>
              </Layout>
            </StudentProvider>
          </Box>
        </Router>
      </AuthProvider>
    </ModalProvider>
  </ThemeProvider>
);
