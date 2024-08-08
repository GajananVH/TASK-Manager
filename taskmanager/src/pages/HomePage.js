import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './HomePage.css'

const HomePage = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <nav>
        <ul>
          <li>
            <Link to="/AddTasksPage">Create New</Link>
          </li>
          <li>
            <Link to="/ViewPage">View existing Tasks</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default HomePage;
