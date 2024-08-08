import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginForm from './components/Login/LoginForm';
import SignupForm from './components/SignUp/SignupForm';
import { useSelector } from 'react-redux';
import AddTasks from './pages/AddTasksPage';
import ViewTask from './pages/ViewPage';
import Header from './components/Header/Header';
import EditTask from './components/EditTask/EditTask';


const App = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div className="App">
      <Header />
      <Routes>
 
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />

        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}>
         
          <Route path="/ViewPage" element={<ViewTask />} /> 
          <Route path="/AddTasksPage" element={< AddTasks/>} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Route>
    
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
