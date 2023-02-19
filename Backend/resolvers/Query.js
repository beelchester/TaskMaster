exports.Query = {
  getAllUsers: async (parent, args, { User }) => {
    console.log(User)
    return await User.find()
},
getUser: async (parent, { email }, { User }) => {
  return await User.findOne({ email })
},
getProjects : async (parent, { email }, { User }) => {
const user = await User.findOne({ email })
return user.projects
},
getTasks : async (parent, { email }, { User }) => {
const user = await User.findOne({ email })
const projects = user.projects
let tasks = []
projects.forEach(project => {
  tasks = tasks.concat(project.tasks) 
})
return tasks
}

}