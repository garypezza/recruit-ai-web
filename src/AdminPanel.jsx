import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import StudentForm from './StudentForm';

function AdminPanel() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_RECRUIT_AI_API + '/students/');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Student List
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Grade</TableCell>
              <TableCell align="right">High School</TableCell>
              <TableCell align="right">GPA</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell component="th" scope="row">
                  {student.name}
                </TableCell>
                <TableCell align="right">{student.age}</TableCell>
                <TableCell align="right">{student.grade}</TableCell>
                <TableCell align="right">{student.highSchool ? student.highSchool.name : 'N/A'}</TableCell>
                <TableCell align="right">{student.academicDetails ? student.academicDetails.gpa : 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StudentForm/>
    </Container>
    
  );
}

export default AdminPanel;
