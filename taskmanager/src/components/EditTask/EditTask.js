import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { editTask } from '../../redux/taskSlice';

const EditTask = () => {
  const { id } = useParams();
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const task = tasks.find((task) => task.id === parseInt(id, 10));

  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [taskDuration, setTaskDuration] = useState(task?.taskDuration || '');
  const [status, setStatus] = useState(task?.status || 'Queued');

  useEffect(() => {
    if (!task) {
      navigate('/');
    }
  }, [task, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editTask({ id: task.id, title, description, taskDuration, status, completed: task.completed }));
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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditTask;
