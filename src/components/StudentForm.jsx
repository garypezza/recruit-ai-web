import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axiosInstance from '../services/axiosInstance';
import { useStudent } from '../context/StudentContext';

const StudentForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [highSchoolName, setHighSchoolName] = useState('');
  const [highSchoolLocation, setHighSchoolLocation] = useState('');
  const [gpa, setGpa] = useState('');
  const [handicap, setHandicap] = useState('');
  const [tournamentAverage, setTournamentAverage] = useState('');
  const [collegeRegion, setCollegeRegion] = useState('');
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
      age,
      grade,
      highSchool: {
        name: highSchoolName,
        location: highSchoolLocation,
      },
      academicDetails: {
        gpa,
      },
      golfInfo: [{
        handicap,
        tournamentAverage,
      }],
      interests: {
        colleges: {
          region: collegeRegion,
        },
      },
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
          label="Age"
          type="number"
          value={age || ''}
          onChange={(e) => setAge(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Grade"
          value={grade || ''}
          onChange={(e) => setGrade(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="High School Name"
          value={highSchoolName || ''}
          onChange={(e) => setHighSchoolName(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="High School Location"
          value={highSchoolLocation || ''}
          onChange={(e) => setHighSchoolLocation(e.target.value)}
          margin="normal"
          fullWidth
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
          label="Golf Handicap"
          value={handicap || ''}
          onChange={(e) => setHandicap(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Tournament Average"
          value={tournamentAverage || ''}
          onChange={(e) => setTournamentAverage(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Interested College Region"
          value={collegeRegion || ''}
          onChange={(e) => setCollegeRegion(e.target.value)}
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
