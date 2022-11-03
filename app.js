// import
const express = require('express')
const expressHbs = require('express-handlebars')
const bodyParser = require('body-parser')
require('dotenv/config')
const path = require('path')
require('./models/database')

// Import routes
const usersRoute = require('./routes/users.router')

const app = express()

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));


// view engine setup
app.set('views', path.join(__dirname, '/views'))



app.engine('hbs', expressHbs.engine({
    extname:".hbs",
    defaultLayout:"mainLayout",
    layoutsDir: __dirname + "/views/"
}))

app.set('view engine', 'hbs')

app.use('/', usersRoute)

app.use(express.static(path.join(__dirname, '/public')));

// Used port
app.listen(3000, () =>{
    console.log('Express server started on port 3000')
})