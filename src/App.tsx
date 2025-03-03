import React, { useEffect, useState } from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './PrivateRoute';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeGrid';
import Home from './Home';
import Header from './shared/header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [employees, setEmployees] = useState<any[]>(() => {
    const savedData = localStorage.getItem('employees');
    return savedData ? JSON.parse(savedData) : [];
  });

  useEffect(() => {
    console.log("Current employees:", employees);
  }, [employees]);

  const handleAddEmployee = (data: any) => {
    console.log("Adding employee:", data);
    
    setEmployees((prev) => {
      const updatedEmployees = [...prev, data];

   
      const storageEmployees = updatedEmployees.map(emp => ({
        ...emp,
        joiningDate: emp.joiningDate instanceof Date ? emp.joiningDate.toISOString() : emp.joiningDate
      }));

      localStorage.setItem('employees', JSON.stringify(storageEmployees));

     

      return updatedEmployees;
    });
  };

  return (
    <Router>
      <Header />
      <main className='flex flex-col items-center p-8'>
       
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/employee-form" 
            element={
              <ProtectedRoute>
                <EmployeeForm onSubmit={handleAddEmployee} />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/employee-list" 
            element={
              <ProtectedRoute>
                <EmployeeList />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Router>
  );
}