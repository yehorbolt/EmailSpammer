
// import user scheme model
const userModel = require('../models/user.scheme.model')

// create user
const createUser = (user) => {
  return userModel.create(user)
}

// find user by id (id unique)
const findUserById = (userId) => {
    return userModel.findById(userId)
}


// find all users
const findAllUsers = () => {
    return userModel.find()
}

// update user
const updateUserById = (userId, updates) => {
    return userModel.findOneAndUpdate({_id : userId}, {$set: updates})
}

// delete user
const deleteUserById = (userId) => {
    return userModel.findOneAndDelete({_id: userId})
}

// export to users route
module.exports = {
    createUser,
    findAllUsers,
    findUserById,
    updateUserById,
    deleteUserById
}