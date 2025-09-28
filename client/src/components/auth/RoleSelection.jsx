import {
  Box,
  Button,
  Card,
  CardContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import {
  AdminPanelSettings,
  Restaurant,
  Person,
  RoomService,
  SupportAgent,
} from '@mui/icons-material';

const roles = [
  {
    id: 'admin',
    title: 'Admin',
    icon: AdminPanelSettings,
    description: 'Hotel administration and management',
  },
  {
    id: 'staff',
    title: 'Staff',
    icon: SupportAgent,
    description: 'Front desk and general operations',
  },
  {
    id: 'chef',
    title: 'Chef',
    icon: Restaurant,
    description: 'Kitchen and restaurant management',
  },
  {
    id: 'service',
    title: 'Service Staff',
    icon: RoomService,
    description: 'Room service and housekeeping',
  },
  {
    id: 'customer',
    title: 'Customer',
    icon: Person,
    description: 'Book rooms and services',
  },
];

const RoleSelection = ({ onSelect, onClose }) => {
  return (
    <Box sx={{ p: 3 }}>
      <DialogTitle sx={{ px: 0 }}>Select Your Role</DialogTitle>
      <Grid container spacing={2}>
        {roles.map((role) => (
          <Grid key={role.id} item xs={12}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s',
                },
              }}
              onClick={() => onSelect(role.id)}
            >
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <role.icon fontSize="large" color="primary" />
                <Box>
                  <Typography variant="h6">{role.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {role.description}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ mt: 3, textAlign: 'right' }}>
        <Button onClick={onClose}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default RoleSelection;
