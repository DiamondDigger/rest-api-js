const express = require('express')
const path = require('path')
const app = express()

const CONTACTS = [
    {name: 'Kenny', value: '3-423-534-34', marked: false}
]

//GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS)
})

app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (res, req) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(port = 3000, () => console.log(`Server has been started on port ${port}... `))

