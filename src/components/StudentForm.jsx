import React, { useState } from 'react';
import '../styles/StudentForm.css';
import axiosInstance from '../services/axiosInstance';

function StudentForm() {
  const initialStudent = {
    name: '',
    age: '',
    grade: '',
    highSchool: {
      name: '',
      location: ''
    },
    academicDetails: {
      gpa: ''
    },
    golfInfo: [
      {
        handicap: '',
        tournamentAverage: ''
      }
    ],
    interests: {
      colleges: {
        region: ''
      }
    }
  };

  const [student, setStudent] = useState(initialStudent);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    });
  };

  const handleNestedChange = (e, path) => {
    const { name, value } = e.target;
    setStudent(prev => {
      // Deep clone to maintain immutability
      let newState = JSON.parse(JSON.stringify(prev));
  
      // Helper function to safely set value in nested object
      function setValue(obj, keys, val) {
        keys.slice(0, -1).reduce((o, k) => (o[k] = o[k] || {}), obj)[keys.slice(-1)[0]] = val;
      }
  
      // Split the path and include the input's name as the last key
      const keys = path.split('.').concat(name);
      setValue(newState, keys, value);
  
      return newState;
    });
  };  
  

  const handleGolfInfoChange = (e, index, fieldName) => {
    const { value } = e.target;
    const newGolfInfo = student.golfInfo.map((item, i) => {
      if (i === index) {
        return { ...item, [fieldName]: value };
      }
      return item;
    });
    setStudent(prev => ({ ...prev, golfInfo: newGolfInfo }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/students', student);
      console.log(response.data);
      alert('Student created successfully!');
    } catch (error) {
      console.error('Error posting student data:', error);
      alert('Failed to create student. Check console for details.');
    }
  };

  return (
    <div className="form-container">
    <h2>Add a student</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name:</label>
        <input type="text" name="name" value={student.name} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Age:</label>
        <input type="number" name="age" value={student.age} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>Grade:</label>
        <input type="text" name="grade" value={student.grade} onChange={handleInputChange} />
      </div>
      <div className="form-group">
        <label>High School Name:</label>
        <input type="text" name="name" value={student.highSchool.name} onChange={(e) => handleNestedChange(e, 'highSchool')} />
      </div>
      <div className="form-group">
        <label>High School Location:</label>
        <input type="text" name="location" value={student.highSchool.location} onChange={(e) => handleNestedChange(e, 'highSchool')} />
      </div>
      <div className="form-group">
        <label>GPA:</label>
        <input type="number" step="0.1" name="gpa" value={student.academicDetails.gpa} onChange={(e) => handleNestedChange(e, 'academicDetails')} />
      </div>
      <div className="form-group">
        <label>Golf Handicap:</label>
        <input type="number" step="0.1" name="handicap" value={student.golfInfo[0]?.handicap || ''} onChange={(e) => handleGolfInfoChange(e, 0, 'handicap')} />
      </div>
      <div className="form-group">
        <label>Interested College Region:</label>
        <input type="text" name="region" value={student.interests.colleges.region || ''} onChange={(e) => handleNestedChange(e, 'interests.colleges')} />
      </div>
      <div className="form-group">
        <label>Tournament Average:</label>
        <input type="number" name="tournamentAverage" value={student.golfInfo[0]?.tournamentAverage || ''} onChange={(e) => handleGolfInfoChange(e, 0, 'tournamentAverage')} />
      </div>
      
      <button type="submit">Submit</button>
    </form>
  </div>
    );
}

export default StudentForm;
