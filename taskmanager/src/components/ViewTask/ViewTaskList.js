import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, editTask } from '../../redux/taskSlice';
import { useNavigate } from 'react-router-dom';
import './ViewTaskList.css';

const ViewTaskList = () => {
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const handleEdit = (id) => {
    navigate(`/edit-task/${id}`);
  };

  const handleRowEdit = (newRow) => {
    const { id, title, description, taskDuration, status, category, completed } = newRow;
    dispatch(editTask({ id, title, description, taskDuration, status, category, completed }));
    return newRow;
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };


  const filteredTasks = selectedCategory === 'All' ? tasks : tasks.filter(task => task.category === selectedCategory);

  const columns = [
    { field: 'title', headerName: 'Title', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 250, editable: true },
    { field: 'taskDuration', headerName: 'Duration', width: 150, editable: true },
    { field: 'status', headerName: 'Status', width: 150, editable: true },
    { field: 'category', headerName: 'Category', width: 150, editable: true }, // Added category column
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div className="data-grid-container">
      <div className="filter-container">
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Shopping">Shopping</option>
          <option value="Travel">Travel</option>
          <option value="Learning">Learning</option>
          <option value="Finance">Finance</option>
        </select>
      </div>
      <DataGrid
        rows={filteredTasks}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        processRowUpdate={handleRowEdit}
      />
    </div>
  );
};

export default ViewTaskList;
