import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Paper, Box, Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../styles/ViewStudent.css';
import axiosInstance from '../services/axiosInstance';
import { useModal } from '../context/ModalContext';
import ChatModal from './ChatModal';

function ViewStudent() {
  const { isOpen, toggleModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [student, setStudent] = useState({
    _id: '',
    name: '',
    gpa: '',
    preferredMajors: '',
    jgsProfile: '',
    instagramProfile: '',
    twitterHandle: '',
    youtube: ''
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get('/users/students/');
        if (response.data.length > 0) {
          const studentData = response.data[0];
          setStudent({
            ...studentData,
            preferredMajors: studentData.preferredMajors?.join(', ') || ''
          });
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudent();
  }, []);

  const handleChange = (e) => {
    setIsEditing(true);
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Clone the student object and remove _id if it exists
    const { _id, ...studentWithoutId } = student;
    const updatedStudent = {
      ...studentWithoutId,
      preferredMajors: student.preferredMajors.split(',').map(major => major.trim())
    };
  
    try {
      let response;
      if (_id) {  // Check if the student object has an _id
        response = await axiosInstance.put(`/students/${_id}`, updatedStudent);
      } else {
        response = await axiosInstance.post('/students/', updatedStudent);
      }
      setStudent({
        ...response.data,
        preferredMajors: Array.isArray(response.data.preferredMajors) ? response.data.preferredMajors.join(', ') : ''
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving student data:', error);
      alert('Failed to save student. Check console for details.');
    }
  };
  
  

  const handleCancel = () => {
    setIsEditing(false);
    // Re-fetch the student data to reset the form
    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get('/users/students/');
        const studentData = response.data[0];
        setStudent({
          ...studentData,
          preferredMajors: studentData.preferredMajors?.join(', ') || ''
        });
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudent();
  };

  return (
    <Container className="studentContainer">
      <Typography variant="h4" component="h1" gutterBottom className="studentTypographyHeader">
        {student.name || 'Student Details'}
      </Typography>
      <Paper className="studentPaper">
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom className="studentGridItemLabel">Name</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="name"
                value={student.name}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom className="studentGridItemLabel">GPA</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="gpa"
                value={student.gpa}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom className="studentGridItemLabel">Preferred Majors</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="preferredMajors"
                value={student.preferredMajors}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom className="studentGridItemLabel">JGS Profile</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="jgsProfile"
                value={student.jgsProfile}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom className="studentGridItemLabel">Instagram Profile</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="instagramProfile"
                value={student.instagramProfile}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom className="studentGridItemLabel">Twitter Handle</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="twitterHandle"
                value={student.twitterHandle}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" gutterBottom className="studentGridItemLabel">YouTube</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="youtube"
                value={student.youtube}
                onChange={handleChange}
                fullWidth
                variant="outlined"
                margin="normal"
              />
            </Grid>
          </Grid>
          <Box sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" color="primary">
              Save Changes
            </Button>
            {isEditing && (
              <Button
                variant="contained"
                color="secondary"
                sx={{ ml: 2 }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
            )}
          </Box>
        </form>
      </Paper>
      {student._id && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={toggleModal}
          style={{ marginTop: '20px', marginLeft: '10px' }}
        >
          Ask Recruit AI
        </Button>
      )}
      {student._id && <ChatModal open={isOpen} handleClose={toggleModal} student={student} />}
    </Container>
  );
}

export default ViewStudent;
