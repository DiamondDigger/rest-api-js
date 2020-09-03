const express = require('express')
const path = require('path')
const {v4} = require('uuid')
const cors = require('cors')
const app = express()

let CONTACTS = [
    {id: v4(), name: 'Kenny-Benny-Manny', value: '3-423-534-34', marked: false}
]

//For work with request (req, res)
app.use(express.json())

//CORS
app.use(cors())

//GET
app.get('/api/contacts', (req, res) => {
    setTimeout(() => {
        res
            .status(200)
            .json(CONTACTS)
    }, 1000)
})

//POST
app.post('/api/contacts', (req, res) => {
    const contact = {id: v4(),...req.body, marked: false}
    CONTACTS.push(contact)
    res
        .status(201)
        .json(contact)
})

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    console.log('req.param.id =', req.params.id)
    CONTACTS = CONTACTS.filter(c => c.id !== req.params.id)
    res
        .status(200)
        .json({message: 'contact have been deleted'})
})

//PUT
app.put('/api/contacts/:id', (req, res) => {
    const indx = CONTACTS.findIndex(c => c.id === req.params.id)
    CONTACTS[indx] = {...req.body}
    res
        .json(CONTACTS[indx])
})


app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res
        .sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(port = 3000, () => console.log(`Server has been started on port ${port}... `))

