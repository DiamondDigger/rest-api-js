const express    = require('express')
const path       = require('path')
const {v4}       = require('uuid')
const cors       = require('cors')
const app        = express()

const CONTACTS = [
    {id: v4() ,name: 'Kenny-Benny-Manny', value: '3-423-534-34', marked: false}
]

//For work with request (req, res)
app.use(express.json())

//CORS
app.use(cors())

//GET
app.get('/api/contacts', (req, res) => {
    setTimeout(()=>{
        res
            .status(200)
            .json(CONTACTS)
    }, 1000)
})

//POST
app.post('/api/contacts', (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}
    CONTACTS.push(contact)
    res
        .status(201)
        .json(contact)
})


app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res
        .sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(port = 3000, () => console.log(`Server has been started on port ${port}... `))

