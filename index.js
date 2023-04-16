require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const Note = require('./models/note')

/*
const mongoose = require('mongoose')

const password = 'G0nnaberich'
const url = `mongodb+srv://binhnguyen:${password}@cluster0.ks5mlgy.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

// Format note schema
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Note = mongoose.model('Note', noteSchema)
*/

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:', request.path)
    console.log('Body:', request.body)
    console.log('---')
    next() // Yield control to the next middleware - Nhường quyền kiểm soát cho phần mềm trung gian tiếp theo
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors())
app.use(express.json()) // json-parser
app.use(express.static('dist')) // Show the static content
app.use(requestLogger)

let notes = []

app.get('/api/notes', (request, response) => {
    Note.find({}).then(notes => {
        response.json(notes)
    })
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body

    if (body.content === undefined) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    
    const note = new Note ({
        content: body.content,
        important: body.important || false,
    })

    // Saved and newly created note
    note.save().then(savedNote => {
        response.json(savedNote)
    })
})

app.get('/api/notes/:id', (request, response) => {
    Note.findById(request.params.id).then(note => {
        response.json(note)
    })
})

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)

    response.status(204).end()
})

app.use(unknownEndpoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
