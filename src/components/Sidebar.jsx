import * as React from 'react';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Divider } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import EmailIcon from '@mui/icons-material/Email';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Logout from './Logout';
import { useAuth } from '../context/AuthContext';

import { Link } from 'react-router-dom';

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
        <Divider />
        <ListItemButton component={Link} to="/student">
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="My Profile" />
        </ListItemButton>
        <Divider />
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <SchoolIcon />
          </ListItemIcon>
          <ListItemText primary="Schools" />
        </ListItemButton>
        <Divider />
        <ListItemButton component={Link} to="/">
          <ListItemIcon>
            <EmailIcon />
          </ListItemIcon>
          <ListItemText primary="Email Insights" />
        </ListItemButton>
        <Divider />
        {user?.role === 'Admin' && (
          <ListItemButton component={Link} to="/admin">
            <ListItemIcon>
              <AdminPanelSettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin Panel" />
          </ListItemButton>
        )}
        <ListItemButton component={Link} to="/">
          <ListItemText>
            <Logout />
          </ListItemText>
        </ListItemButton>
      </List>
    </Box>
  );
}
