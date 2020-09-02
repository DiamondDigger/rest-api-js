const express = require('express')
const path = require('path')
const app = express()

const CONTACTS = [
    {name: 'Kenny-Benny-Manny', value: '3-423-534-34', marked: false}
]

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*')
    next()
})

//GET
app.get('/api/contacts', (req, res) => {
    setTimeout(()=>{
        res.status(200).json(CONTACTS)
    }, 4000)
})

app.post('/api/contacts', (res, req) => {

    res.status(201).json
});


app.use(express.static(path.resolve(__dirname, 'client')))

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
})
app.listen(port = 3000, () => console.log(`Server has been started on port ${port}... `))

