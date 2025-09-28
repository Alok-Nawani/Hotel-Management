import { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginDialog from '../components/auth/LoginDialog';
import RoleSelection from '../components/auth/RoleSelection';


const LandingPage = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setLoginOpen(true);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Hero Background */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: -1,
            background: 'linear-gradient(45deg, #1e3d59 30%, #2c5282 90%)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'url("data:image/svg+xml,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%239C92AC" fill-opacity="0.05" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E")',
              opacity: 0.2,
            }
          }}
        />

        {/* Navigation */}
        <AppBar position="static" color="transparent" elevation={0}>
          <Container>
            <Box sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="div" sx={{ 
                color: 'white', 
                fontWeight: 'bold',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                fontFamily: '"Playfair Display", serif',
              }}>
                LuxStay
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ color: 'white' }}
                  onClick={() => navigate('/rooms')}
                >
                  Rooms
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  sx={{ color: 'white' }}
                  onClick={() => navigate('/dining')}
                >
                  Dining
                </Button>
                <Button
                  variant="contained"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.9)',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: 'white',
                    }
                  }}
                  onClick={() => setLoginOpen(true)}
                >
                  Login
                </Button>
              </Box>
            </Box>
          </Container>
        </AppBar>

        {/* Hero Content */}
        <Container>
          <Grid container sx={{ height: '80vh', alignItems: 'center' }}>
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  Welcome to LuxStay
                </Typography>
                <Typography variant="h5" gutterBottom>
                  Experience luxury and comfort at its finest
                </Typography>
                <Box sx={{ mt: 4 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/rooms')}
                    sx={{ mr: 2 }}
                  >
                    View Rooms
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={() => navigate('/book')}
                    sx={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
                  >
                    Book Now
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Role Selection Dialog */}
      <Dialog
        open={loginOpen && !selectedRole}
        onClose={() => setLoginOpen(false)}
        maxWidth="xs"
        fullWidth
      >
        <RoleSelection onSelect={handleRoleSelect} onClose={() => setLoginOpen(false)} />
      </Dialog>

      {/* Login Dialog */}
      <Dialog
        open={loginOpen && selectedRole}
        onClose={() => {
          setLoginOpen(false);
          setSelectedRole(null);
        }}
        maxWidth="xs"
        fullWidth
      >
        <LoginDialog role={selectedRole} onClose={() => {
          setLoginOpen(false);
          setSelectedRole(null);
        }} />
      </Dialog>
    </Box>
  );
};

export default LandingPage;
