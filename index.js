
//import express
const express = require('express')
const dataservice = require('./services/data.service')

//create app using express
const app = express()

//GET(read data) request and resolve
app.get('/', (req, res) => {
    res.status(500).send("its a get method")
})


//to parse json
app.use(express.json())
//POST - to create data

app.post('/', (req, res) => {
    res.send("its a post method")
})

//PUT - update data 
app.put('/', (req, res) => {
    res.send("its a put method")
})

//PATCH - partialy update data
app.patch('/', (req, res) => {
    res.send("its a patch method")
})
//DELETE - delete data
app.delete('/', (req, res) => {
    res.send("its a delete method")
})

//application specific middleware

const appMiddleware = (req,res,next)=>{
    console.log("Application specific middleware")
    next()
}

app.use(appMiddleware)


//bank app-API
//register API

app.post('/register', (req, res) => {
    const result = dataservice.register(req.body.acno,req.body.uname,req.body.password)
    res.status(result.statusCode).json(result)

})

app.post('/login', (req, res) => {
    const result = dataservice.login(req.body.acno, req.body.password)
    res.status(result.statusCode).json(result)
})

app.post('/deposit', (req, res) => {
    const result = dataservice.deposit(req.body.acno, req.body.password, req.body.amount)
    res.status(result.statusCode).json(result)

})

app.post('/withdraw', (req, res) => {
    const result = dataservice.withdraw(req.body.acno, req.body.password, req.body.amount)
    res.status(result.statusCode).json(result)

})

app.post('/transaction', (req, res) => {
    const result = dataservice.getTransaction(req.body.acno)
    res.status(result.statusCode).json(result)

})




//set up the port number
app.listen(3000, () => {
    console.log('server started at port no:3000');
})
