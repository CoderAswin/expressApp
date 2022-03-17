// Import express


const express = require('express')

const dataService = require('./Services/data.service')

// create an application using express
const app = express()

// To parse json
app.use(express.json())

// Resolve http req from client
// GET to read data
app.get('/', (req, res) => {
    res.send("IT'S A GET METHOD Hoiiiii Uricaa.....")
})

// PUT to update/modify data
app.put('/', (req, res) => {
    res.send("IT'S A PUT METHOD Yoo..")
})

// POST to create  data
app.post('/', (req, res) => {
    res.send("IT'S A POST METHOD Ha Ha...")
})

// PATCH to update partially data
app.patch('/', (req, res) => {
    res.send("IT'S A PATCH METHOD Koii...")
})

// DELETE to delete data
app.delete('/', (req, res) => {
    res.send("IT'S A DELETE METHOD lalala...")
})

// Application specific Middleware
const appMiddleware = (req, res, next) => {
    console.log("Application specific middleware");
    next();
}

app.use(appMiddleware)

// Bank app - API  
// register - API
app.post('/register', (req, res) => {
    const result = dataService.register(req.body.acno, req.body.pswd, req.body.uname)
    // we need to convert the result to json format because frontend read json format only
    res.status(result.statusCode).json(result)
})

// register - API
app.post('/login', (req, res) => {
    const result = dataService.login(req.body.acno, req.body.pswd)
    // we need to convert the result to json format because frontend read json format only
    res.status(result.statusCode).json(result)
})

// deposit - API
app.post('/deposit', (req, res) => {
    const result = dataService.deposit(req.body.acno, req.body.pswd, req.body.amount)
    // we need to convert the result to json format because frontend read json format only
    res.status(result.statusCode).json(result)
})
// Withdraw - API
app.post('/withdraw', (req, res) => {
    const result = dataService.withdraw(req.body.acno, req.body.pswd, req.body.amount)
    // we need to convert the result to json format because frontend read json format only
    res.status(result.statusCode).json(result)
})

// transcation - API
app.post('/transcation', (req, res) => {
    const result = dataService.getTranscation(req.body.acno)
    // we need to convert the result to json format because frontend read json format only
    res.status(result.statusCode).json(result)
})

// set up the port number
app.listen(3000, () => {
    console.log("Server start at port number: 3000");

})