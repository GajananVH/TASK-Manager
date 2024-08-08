import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask, editTask } from '../../redux/taskSlice';
import { useNavigate } from 'react-router-dom';
import './ViewTaskList.css'


const ViewTaskList = () => {
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
    const { id, title, description, taskDuration, status, completed } = newRow;
    dispatch(editTask({ id, title, description, taskDuration, status, completed }));
    return newRow;
  };

  const columns = [
    { field: 'title', headerName: 'Title', width: 150, editable: true },
    { field: 'description', headerName: 'Description', width: 250, editable: true },
    { field: 'taskDuration', headerName: 'Duration', width: 150, editable: true },
    { field: 'status', headerName: 'Status', width: 150, editable: true },
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
    <DataGrid
        rows={tasks}
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
