import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import ViewStudent from './ViewStudent';
import AdminPanel from './AdminPanel';
import HomePage from './HomePage';
import Sidebar from './Sidebar';
import { StudentProvider } from './StudentContext';
import { createRoot } from 'react-dom/client';
import { ModalProvider } from './ModalContext';  
import Layout from './Layout';  

const theme = createTheme({
  // your theme options
});

const container = document.getElementById('root')
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline /> {/* MUI's reset style component */}
    <ModalProvider> {/* Wrap the Router with ModalProvider */}
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Sidebar />
          <StudentProvider>
            <Layout> {/* Wrap the main content with Layout */}
              <Box
                component="main"
                sx={{ flexGrow: 1, p: 3 }}
              >
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/student/:studentId" element={<ViewStudent />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  {/* Add more routes as needed */}
                </Routes>
              </Box>
            </Layout>
            </StudentProvider>
        </Box>
      </Router>
    </ModalProvider>
  </ThemeProvider>
);
