const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  taskDuration: { type: String, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['Queued', 'Started', 'In Progress', 'Completed', 'On Hold'] 
  },
  category: { 
    type: String, 
    required: true, 
    enum: ['Work', 'Personal', 'Shopping', 'Travel', 'Learning', 'Finance'] 
  },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Task', TaskSchema);
