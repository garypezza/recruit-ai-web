import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Box, Button } from '@mui/material';
import axiosInstance from '../services/axiosInstance';
import '../styles/SchoolProfile.css';

const SchoolProfile = () => {
  const { id } = useParams();
  const [school, setSchool] = useState(null);

  useEffect(() => {
    const fetchSchool = async () => {
      try {
        const response = await axiosInstance.get(`/schools/${id}`);
        setSchool(response.data);
      } catch (error) {
        console.error('Error fetching school data:', error);
      }
    };

    fetchSchool();
  }, [id]);

  if (!school) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg" className="school-profile-container">
      <Typography variant="h3" gutterBottom className="school-name">{school.School}</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} className="info-box">
            <Typography variant="h6">Coach Info</Typography>
            <Typography>{school.CoachName}</Typography>
            <Typography>{school.CoachTitle}</Typography>
            <Button variant="contained" color="primary" className="compose-button">Compose</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} className="info-box">
            <Typography variant="h6">Average Scores</Typography>
            <Typography>{school.FirstPlayerAverageScore} - {school.FifthPlayerAverageScore}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} className="info-box">
            <Typography variant="h6">Spots</Typography>
            <Typography>4 Spots</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} className="info-box">
            <Typography variant="h6">Good</Typography>
            <Typography>Your scores: 40th percentile</Typography>
          </Paper>
        </Grid>
      </Grid>

      <Box mt={4}>
        <Typography variant="h6">Team Composition</Typography>
        <Paper elevation={3} className="info-box">
          <Typography>Freshmen: {school.Freshmen}</Typography>
          <Typography>Sophomores: {school.Sophomores}</Typography>
          <Typography>Juniors: {school.Juniors}</Typography>
          <Typography>Seniors: {school.Seniors}</Typography>
        </Paper>
      </Box>

      <Box mt={4}>
        <Typography variant="h6">Email History with {school.School}</Typography>
        <Paper elevation={3} className="info-box">
          <Typography variant="body1">Recommendation</Typography>
          <Typography>
            Start with an introductory email to the coach using the introductory template.
          </Typography>
          <Button variant="contained" color="primary" className="compose-button">Compose</Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default SchoolProfile;
