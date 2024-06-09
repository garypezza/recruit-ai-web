import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axiosInstance from '../services/axiosInstance';
import { useStudent } from '../context/StudentContext';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [gpa, setGpa] = useState('');
  const [preferredMajors, setPreferredMajors] = useState('');
  const [jgsProfile, setJgsProfile] = useState('');
  const [instagramProfile, setInstagramProfile] = useState('');
  const [twitterHandle, setTwitterHandle] = useState('');
  const [youtube, setYoutube] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const { setStudent } = useStudent();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const student = {
      name,
      gpa,
      preferredMajors: preferredMajors.split(',').map(major => major.trim()), // Split and trim input
      jgsProfile,
      instagramProfile,
      twitterHandle,
      youtube
    };

    try {
      const response = await axiosInstance.post('/students', student);
      setStudent(response.data);
      navigate(`/student/`); // Navigate to the student page
    } catch (error) {
      console.error('Error posting student data:', error);
      alert('Failed to create student. Check console for details.');
    }
  };

  return (
    <Container>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 2,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Create Student
        </Typography>
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="success" gutterBottom>
            {success}
          </Typography>
        )}
        <TextField
          label="Name"
          value={name || ''}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
          fullWidth
          required
        />
        <TextField
          label="GPA"
          type="number"
          value={gpa || ''}
          onChange={(e) => setGpa(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Preferred Majors"
          value={preferredMajors || ''}
          onChange={(e) => setPreferredMajors(e.target.value)}
          margin="normal"
          fullWidth
          placeholder="Separate majors with commas"
        />
        <TextField
          label="JGS Profile"
          value={jgsProfile || ''}
          onChange={(e) => setJgsProfile(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Instagram Profile"
          value={instagramProfile || ''}
          onChange={(e) => setInstagramProfile(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Twitter Handle"
          value={twitterHandle || ''}
          onChange={(e) => setTwitterHandle(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="YouTube"
          value={youtube || ''}
          onChange={(e) => setYoutube(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Create Student
        </Button>
      </Box>
    </Container>
  );
};

export default StudentForm;
