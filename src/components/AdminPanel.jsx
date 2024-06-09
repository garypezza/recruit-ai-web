import React, { useState, useEffect } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm';
import UsersTable from './UsersTable';
import axiosInstance from '../services/axiosInstance';

function AdminPanel() {
  const [students, setStudents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axiosInstance.get('/students/');
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
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
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">GPA</TableCell>
              <TableCell align="right">Preferred Majors</TableCell>
              <TableCell align="right">JGS Profile</TableCell>
              <TableCell align="right">Instagram Profile</TableCell>
              <TableCell align="right">Twitter Handle</TableCell>
              <TableCell align="right">YouTube</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student._id}>
                <TableCell component="th" scope="row">
                  <Link to={`/student/${student._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {student._id}
                  </Link>
                </TableCell>
                <TableCell align="right">{student.name}</TableCell>
                <TableCell align="right">{student.gpa}</TableCell>
                <TableCell align="right">{student.preferredMajors?.join(', ') || 'N/A'}</TableCell>
                <TableCell align="right">{student.jgsProfile || 'N/A'}</TableCell>
                <TableCell align="right">{student.instagramProfile || 'N/A'}</TableCell>
                <TableCell align="right">{student.twitterHandle || 'N/A'}</TableCell>
                <TableCell align="right">{student.youtube || 'N/A'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h4" component="h2" marginTop={3} gutterBottom>
        Users List
      </Typography>
      <UsersTable users={users} />
      <StudentForm />
    </Container>
  );
}

export default AdminPanel;
