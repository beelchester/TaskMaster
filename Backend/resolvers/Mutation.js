exports.Mutation = {
  
    createUser: async (_, { email },{User}) => {
     const findUser = await User.findOne({ email })
      if (findUser) {
      return
      }
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
    // const newTask = {
    //   id: uuidv4(),
    //   text: task.text,
    //   completed: task.completed,
    //   due: task.due,
    //   priority: task.priority,
    //   checked: task.checked
    // }
    project.tasks.push(task);
    await user.save();
    return task
    },
    updateTask: async (_, { email, projectName, taskId, updatedTask },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    const t = project.tasks.find(t => t.id === taskId);
    t.text = updatedTask.text;
    t.completed = updatedTask.completed;
    t.due = updatedTask.due;
    t.priority = updatedTask.priority;
    t.project = updatedTask.project;
    t.checked = updatedTask.checked;
    await user.save();
    return t;
    },
    deleteTask: async (_, { email, projectName, taskId },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    const t = project.tasks.find(t => t.id === taskId);
    // delete t from project.tasks
    // project.tasks.splice(t, 1)[0]
    project.tasks = project.tasks.filter(task => task !== t)
    await user.save();
    return t;
    },
    createProject: async (_, { email, projectName },{User}) => {
    const user = await User.findOne({ email });
    user.projects.push({projectName: projectName, tasks: []});
    await user.save();
    return user;
    },
    updateProject: async (_, { email, projectName, newProjectName },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    project.projectName = newProjectName;
    project.tasks.map(task=>task.project = newProjectName)
    await user.save();
    return user;
    },
    deleteProject: async (_, { email, projectName },{User}) => {
    const user = await User.findOne({ email });
    const project = user.projects.find(project => project.projectName === projectName);
    user.projects=user.projects.filter(proj => proj !== project)
    // project.tasks = project.tasks.filter(task => task !== t)
    await user.save();
    return user;
    },
  }