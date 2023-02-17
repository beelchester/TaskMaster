exports.Mutation = {
  
    createUser: async (_, { email },{User}) => {
      
      const user = new User({ email, projects: [{projectName: 'Inbox', tasks: []}] });
      await user.save();
      return user;
      
    },
    updateUser: async (_, { email, projects },{User}) => {
      // const user = await User.findOneAndUpdate({ email }, { projects }, { new: true });
      const user = await User.findOne({ email });
      user.projects = projects;
      await user.save();
      return user;
    },
    deleteUser: async (_, { email },{User}) => {
      const user = await User.findOneAndDelete({ email });
      return user;
    },

    createTask: async (_, { email, projectName, task },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    project.tasks.push(task);
    await user.save();
    },
    updateTask: async (_, { email, projectName, task },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    const t = project.tasks.find(task => task.id === id);
    t.text = text;
    t.completed = completed;
    t.due = due;
    t.priority = priority;
    t.project = project;
    t.checked = checked;
    await user.save();
    },
    deleteTask: async (_, { email, projectName, task },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    const t = project.tasks.find(task => task.id === id);
    project.tasks.splice(t, 1);
    },
    createProject: async (_, { email, projectName },{User}) => {
    const user = await User.findOne({ email });
    user.projects.push({projectName: projectName, tasks: []});
    await user.save();
    },
    updateProject: async (_, { email, projectName, tasks },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    project.projectName = projectName;
    await user.save();
    },
    deleteProject: async (_, { email, projectName },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    user.projects.splice(project, 1);
    await user.save();
    }
  }