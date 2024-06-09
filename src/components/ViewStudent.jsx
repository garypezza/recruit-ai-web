import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../styles/ViewStudent.css';
import { useStudent } from '../context/StudentContext';
import axiosInstance from '../services/axiosInstance';
import { useModal } from '../context/ModalContext';
import ChatModal from './ChatModal';
import StudentForm from './StudentForm';

function ViewStudent() {
  const { studentId } = useParams();
  const { student, setStudent } = useStudent();
  const { isOpen, toggleModal } = useModal();

  const buttonStyle = {
    position: 'fixed',
    bottom: 20,
    right: 20,
    backgroundColor: 'green',
    color: 'white',
    borderRadius: '50px',
    padding: '10px 24px',
    textTransform: 'none',
    fontSize: '0.875rem',
    minWidth: 'auto',
    width: 'auto',
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axiosInstance.get('/users/students/');
        setStudent(response.data[0]);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudent();
  }, [studentId, setStudent]);

  if (!student) {
    return <StudentForm onStudentCreated={setStudent} />;
  }

  const InfoItem = ({ label, value }) => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle1" gutterBottom className="studentGridItemLabel">{label}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box className="studentBox">
          <Typography>{value}</Typography>
        </Box>
      </Grid>
    </Grid>
  );

  return (
    <Container className="studentContainer">
      <Typography variant="h4" component="h1" gutterBottom className="studentTypographyHeader">
        {student.name}
      </Typography>
      <Paper className="studentPaper">
        <InfoItem label="GPA" value={student.gpa} />
        <InfoItem label="Preferred Majors" value={student.preferredMajors?.join(', ') || 'N/A'} />
        <InfoItem label="JGS Profile" value={student.jgsProfile || 'N/A'} />
        <InfoItem label="Instagram Profile" value={student.instagramProfile || 'N/A'} />
        <InfoItem label="Twitter Handle" value={student.twitterHandle || 'N/A'} />
        <InfoItem label="YouTube" value={student.youtube || 'N/A'} />
      </Paper>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={toggleModal}
        style={buttonStyle}
      >
        Ask Recruit AI
      </Button>
      <ChatModal open={isOpen} handleClose={toggleModal} student={student} />
    </Container>
  );
}

export default ViewStudent;
