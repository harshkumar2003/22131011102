import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      elevation={1}
      sx={{
        backgroundColor: '#ffffff',
        color: '#1976d2',
        borderBottom: '1px solid #e0e0e0',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1.3rem',
            color: 'inherit',
          }}
        >
          URL Shortener
        </Typography>

        <Box>
          <Button
            component={RouterLink}
            to="/"
            sx={{
              color: 'inherit',
              textTransform: 'none',
              fontWeight: 500,
              mx: 1,
            }}
          >
            Home
          </Button>
          <Button
            component={RouterLink}
            to="/statistics"
            sx={{
              color: 'inherit',
              textTransform: 'none',
              fontWeight: 500,
              mx: 1,
            }}
          >
            Statistics
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
