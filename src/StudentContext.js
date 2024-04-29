// StudentContext.js
import React, { createContext, useState, useContext } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState(null);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
