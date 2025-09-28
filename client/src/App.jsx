import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { theme } from './theme';
import { NotificationProvider } from './components/common/NotificationProvider';
import Layout from './components/layout/Layout';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import RoomManagement from './pages/RoomManagement';
import MenuManagement from './components/menu/MenuManagement';

// Initialize React Query client
const queryClient = new QueryClient();

// Protected Route component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

const AppContent = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Show landing page without layout
  if (location.pathname === '/' && !user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/menu-management"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <MenuManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/room-management"
        element={
          <ProtectedRoute allowedRoles={['admin', 'manager']}>
            <RoomManagement />
          </ProtectedRoute>
        }
      />
      {/* Add more routes as needed */}
    </Routes>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <Router>
            <AuthProvider>
              <AppContent />
            </AuthProvider>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
