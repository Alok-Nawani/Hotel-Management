import { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Navigation = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            Restaurant MS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {user && (
              <>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Dashboard
                </Button>
                
                {(user.role === 'admin' || user.role === 'manager') && (
                  <>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/menu-management"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Menu Management
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/room-management"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Room Management
                    </Button>
                    <Button
                      color="inherit"
                      component={Link}
                      to="/staff-management"
                      sx={{ my: 2, color: 'white', display: 'block' }}
                    >
                      Staff Management
                    </Button>
                  </>
                )}
                
                {user.role === 'waiter' && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/tables"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Tables
                  </Button>
                )}
                
                {user.role === 'chef' && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/kitchen"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Kitchen Orders
                  </Button>
                )}
                
                {user.role === 'cashier' && (
                  <Button
                    color="inherit"
                    component={Link}
                    to="/billing"
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    Billing
                  </Button>
                )}
              </>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{user?.name?.[0] || 'U'}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navigation;
