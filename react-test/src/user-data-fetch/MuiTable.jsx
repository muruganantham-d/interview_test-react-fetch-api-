import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Alert,
  Box,
  Typography,
} from '@mui/material';

const MuiTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <CircularProgress size={50} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
        <Alert severity="error" variant="filled">Error: {error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        User Details
      </Typography>
      <TableContainer
        component={Paper}
        elevation={6}
        sx={{
          borderRadius: 3,
          overflow: 'auto',
        }}
      >
        <Table stickyHeader sx={{ minWidth: 800 }} aria-label="user table">
          <TableHead>
            <TableRow>
              {['ID', 'Name', 'Email', 'Phone', 'Username', 'Website'].map((header) => (
                <TableCell
                  key={header}
                  sx={{
                    backgroundColor: '#1976d2',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: '1rem',
                    textAlign: 'left',   // left alignment
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                hover
                sx={{
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#fff',
                  '&:last-child td, &:last-child th': { border: 0 },
                  '&:hover': {
                    backgroundColor: '#e3f2fd',
                  },
                }}
              >
                <TableCell sx={{ textAlign: 'left' }}>{user.id}</TableCell>
                <TableCell sx={{ textAlign: 'left' }}>{user.name}</TableCell>
                <TableCell sx={{ textAlign: 'left' }}>{user.email}</TableCell>
                <TableCell sx={{ textAlign: 'left' }}>{user.phone}</TableCell>
                <TableCell sx={{ textAlign: 'left' }}>{user.username}</TableCell>
                <TableCell sx={{ textAlign: 'left' }}>{user.website}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MuiTable;
