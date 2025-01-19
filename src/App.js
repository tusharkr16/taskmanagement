import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import ProjectManagement from './Pages/ProjectManagement/ProjectManagement';
import TaskManagement from './Pages/TaskManagement/TaskManagement';


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/projectManagement' element={<ProjectManagement/>} />
        <Route path='/your-task' element={<TaskManagement/>} />
      </Routes>
    </div>
  );
};

export default App;
