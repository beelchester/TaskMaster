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
}
}