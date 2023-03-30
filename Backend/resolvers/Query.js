require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require('express');
exports.Query = {
  getAllUsers: async (parent, args, { User }) => {
    return await User.find()
},
getUser: async (parent, { email }, { User,RefreshToken, res }) => {
  const user= await User.findOne({ email})
  const accessToken = jwt.sign({userId:user.id}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15d' })
  const oldRefreshToken = await RefreshToken.findOne({userId:user.id})
  if(oldRefreshToken){
    await oldRefreshToken.delete()
  }
  const refreshToken = jwt.sign({userId:user.id}, process.env.REFRESH_TOKEN_SECRET)
 const newRefreshToken = new RefreshToken({token:refreshToken, userId:user.id}) 
  await newRefreshToken.save() 
  return {accessToken,refreshToken,user}
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
},
refresh: async (_, { email, refreshToken }, { RefreshToken, User }) => {
  console.log(email,refreshToken)
  try {
    if (!refreshToken) {
      throw new Error("Refresh token not provided");
    }
    const token = await RefreshToken.findOne({ token: refreshToken });
    if (!token) {
      throw new Error("Refresh token not found");
    }
    const user = await User.findOne({ email });

    const accessToken = await new Promise((resolve, reject) => {
      jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET, (err) => {
        if (err) {
          reject(new Error("Refresh token not valid"));
        }
        const accessToken = jwt.sign(
          { userId: user.id },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15s" }
        );
        resolve(accessToken);
      });
    });

    console.log(accessToken);
    return { accessToken };
  } catch (err) {
    throw new Error(err);
  }
}
};
