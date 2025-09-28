import { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  IconButton,
  MenuItem,
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roomAPI } from '../api';
import { useSnackbar } from 'notistack';

const RoomManagement = () => {
  const [open, setOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ['rooms'],
    queryFn: () => roomAPI.getAll().then(response => response.data)
  });

  const createMutation = useMutation({
    mutationFn: roomAPI.create,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
      handleClose();
      enqueueSnackbar('Room created successfully', { variant: 'success' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => roomAPI.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
      handleClose();
      enqueueSnackbar('Room updated successfully', { variant: 'success' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: roomAPI.delete,
    onSuccess: () => {
      queryClient.invalidateQueries(['rooms']);
      enqueueSnackbar('Room deleted successfully', { variant: 'success' });
    },
  });

  const handleOpen = (room = null) => {
    setSelectedRoom(room);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedRoom(null);
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    if (selectedRoom) {
      updateMutation.mutate({
        id: selectedRoom.room_id,
        data: Object.fromEntries(formData)
      });
    } else {
      createMutation.mutate(Object.fromEntries(formData));
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Room Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Room
        </Button>
      </Box>

      <Grid container spacing={3}>
        {Array.isArray(rooms) && rooms.map((room) => (
          <Grid key={room.room_id} sm={6} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={room.images?.[0] || '/placeholder-room.jpg'}
                alt={room.type}
              />
              <CardContent>
                <Typography variant="h6">Room {room.room_number}</Typography>
                <Typography variant="subtitle1" color="primary">{room.type}</Typography>
                <Typography>Floor: {room.floor}</Typography>
                <Typography>Price: ₹{room.price}/night</Typography>
                <Typography>Capacity: {room.capacity} persons</Typography>
                <Typography color={
                  room.status === 'available' ? 'success.main' :
                  room.status === 'occupied' ? 'error.main' :
                  room.status === 'maintenance' ? 'warning.main' : 'info.main'
                }>
                  Status: {room.status}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <IconButton onClick={() => handleOpen(room)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => deleteMutation.mutate(room.room_id)}>
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit}>
          <DialogTitle>
            {selectedRoom ? 'Edit Room' : 'Add New Room'}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  name="room_number"
                  label="Room Number"
                  fullWidth
                  defaultValue={selectedRoom?.room_number}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  name="type"
                  label="Room Type"
                  select
                  fullWidth
                  defaultValue={selectedRoom?.type || 'Standard'}
                  required
                >
                  {['Standard', 'Deluxe', 'Suite'].map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  name="floor"
                  label="Floor"
                  type="number"
                  fullWidth
                  defaultValue={selectedRoom?.floor}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  margin="dense"
                  name="capacity"
                  label="Capacity"
                  type="number"
                  fullWidth
                  defaultValue={selectedRoom?.capacity || 2}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="price"
                  label="Price per Night"
                  type="number"
                  fullWidth
                  defaultValue={selectedRoom?.price}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="status"
                  label="Status"
                  select
                  fullWidth
                  defaultValue={selectedRoom?.status || 'available'}
                  required
                >
                  {['available', 'occupied', 'maintenance', 'reserved'].map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="description"
                  label="Description"
                  multiline
                  rows={4}
                  fullWidth
                  defaultValue={selectedRoom?.description}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {selectedRoom ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default RoomManagement;
