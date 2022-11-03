
// import
const express = require('express')
const router = express.Router()
const userDao = require('../daos/user.dao.server')
const sendMail = require('../sendMails/nodemailer')
const { putInSchema } = require("../services/user.validation");


// Start page (and create new User
router.get('/', async (req, res) => {
    res.render("mainPage")
})


// GetAllUsers
router.get('/users', async (req, res) => {
    try{
        await userDao.findAllUsers().then(documents => {
            const context = {
            usersDocuments: documents.map(document => {
                return {
                    _id: document._id,
                    lastName: document.lastName,
                    name: document.name,
                    patronymic: document.patronymic,
                    email: document.email,
                    message: document.message
                }
            })
        }
        res.render("list",{
            list: context.usersDocuments
        })})


    }catch(err){
        console.log({message:err})
    }
})

// Add new user
router.get('/user', async (req, res) => {
    try {
       res.render("addUser")
    }catch(err){
        console.log({message:err})
    }

})

// Add new user
router.post('/user', async (req, res) => {
    try {
            const {lastName,name,patronymic,email,message} = req.body
            const userBody = {lastName,name,patronymic,email,message}
            await putInSchema.validateAsync(userBody)
            await userDao.createUser(userBody)
            res.redirect('users')
    }catch(err){
        console.log({message:err})
    }

})


// Update selected user
router.get('/user/:id', async (req, res) => {
    const userID = req.params.id
    try {
        const user = await userDao.findUserById(userID)
        const userBody = {
            _id: user._id, lastName: user.lastName,
            name: user.name, patronymic: user.patronymic,
            email: user.email, message: user.message
        }
        res.render("updateUser",{
            spamers: userBody
        })
    } catch (err) {
        console.log({ message: err })
    }

})

// Update selected user
router.post('/user/:id', async (req, res) => {
    const userID = req.params.id
    try {
        const {lastName,name,patronymic,email,message} = req.body
        const userBody = {lastName,name,patronymic,email,message}
        await putInSchema.validateAsync(userBody)
        await userDao.updateUserById(userID,userBody)
        res.redirect('/users')
    } catch (err) {
        console.log({ message: err })
    }

})



// Delete selected user
router.get('/delete/:id', async (req, res) => {
    const userId = req.params.id
    try{
        await userDao.deleteUserById(userId)
        res.redirect('/users')
    }catch(err){
        console.log({message:err})
    }
})


// Send mails
router.post('/users', async (req, res) => {
    try {
        const message = req.body.message
        await userDao.findAllUsers().then(documents => {
            documents.map(document => {
                const User = {lastName:document.lastName,name:document.name,patronymic:
                    document.patronymic, email:document.email,message:message}
                sendMail(User.email,User.lastName,User.name,User.patronymic,User.message)
            })
        })
        res.redirect('/users')
    }catch(err){
        console.log({message:err})
    }

})


// Send mail
router.get('/send/:id', async (req, res) => {
    try {
        const userId = req.params.id
        await userDao.findUserById(userId).then(document => {
                const User = {lastName:document.lastName,name:document.name,patronymic:
                    document.patronymic, email:document.email,message:document.message}
                sendMail(User.email,User.lastName,User.name,User.patronymic,User.message)
        })
        res.redirect('/users')
    }catch(err){
        console.log({message:err})
    }

})


module.exports = router;