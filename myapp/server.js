const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

mongoose.connect('mongodb://localhost:27017/bookDb')

mongoose.connection.on('connected', () => {
    console.log("MongoDB connected successfully")
})

const bookSchema = mongoose.Schema({
    name: String,
    author: String,
    publish_year: Number,
    price: Number
})

const Book = mongoose.model('Book', bookSchema, 'booksCollection')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html')
})

// GET
app.get('/api/books', (req, res) => {
    Book.find().then(data => res.send(data))
})

// POST
app.post('/api/addBook', (req, res) => {
    Book.create(req.body)
    .then(() => res.json({ message: "Book Added" }))
})

// DELETE
app.delete('/api/deleteBook/:id', (req,res)=>{
    console.log("Deleting Id:", req.params.id)

    Book.deleteOne({_id: req.params.id})
    .then(() => res.json({ message: "Book Deleted" }))
    .catch(err =>{
        console.log(err)
        res.status(500).json({message: "error"})
    })
})

// UPDATE
app.put('/api/updateBook/:id', (req, res) => {
    Book.findByIdAndUpdate(req.params.id, req.body)
    .then(() => res.json({ message: "Updated" }))
})

app.listen(5000, () => {
    console.log("Server running on port 5000")
})