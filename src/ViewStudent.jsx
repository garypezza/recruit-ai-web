import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Grid, Paper, Box, Card, CardContent } from '@mui/material';
import './ViewStudent.css'; // Import the CSS file
import { useStudent } from './StudentContext';

function ViewStudent() {
  const { studentId } = useParams();
  const { student, setStudent } = useStudent();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_RECRUIT_AI_API + `/students/${studentId}`);
        setStudent(response.data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    fetchStudent();
  }, [studentId, setStudent]);

  if (!student) {
    return <Typography>Loading...</Typography>;
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
        <InfoItem label="Age" value={student.age} />
        <InfoItem label="Grade" value={student.grade} />
        <InfoItem label="High School Name" value={student.highSchool.name} />
        <InfoItem label="High School Location" value={student.highSchool.location} />
        <InfoItem label="GPA" value={student.academicDetails.gpa} />
        <InfoItem label="Golf Handicap" value={student.golfInfo[0].handicap} />
        <InfoItem label="Tournament Average" value={student.golfInfo[0].tournamentAverage} />
        <InfoItem label="Interested College Region" value={student.interests.colleges.region} />
      </Paper>
    </Container>
  );
}
export default ViewStudent;
