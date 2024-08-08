import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../../redux/taskSlice';
import { useNavigate } from 'react-router-dom';


const TaskForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [taskDuration, setTaskDuration] = useState('');
  const [status, setStatus] = useState('Queued'); 
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(), 
      title,
      description,
      taskDuration,
      status, 
      completed: false, 
    };
    console.log(newTask);
    dispatch(addTask(newTask));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Duration:</label>
        <input
          type="text"
          value={taskDuration}
          onChange={(e) => setTaskDuration(e.target.value)}
          required
          placeholder="e.g., 2 hours"
        />
      </div>
      <div>
        <label>Current Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Queued">Queued</option>
          <option value="Started">Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="On Hold">On Hold</option>
        </select>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
