const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  completed: { type: Boolean, required: true },
  due: { type: Date, required: true },
  priority: { type: String, required: true },
  project: { type: String, required: true },
  checked: { type: Boolean, required: true }
});

const projectSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  tasks: [taskSchema]
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  projects: [projectSchema]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
