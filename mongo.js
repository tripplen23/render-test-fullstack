const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log("Give password as argument")
    process.exit(1)
}

// Passing the password from credentials we created in MongoDB Atlas, as a command line parameter.
const password = process.argv[2]

// Connection
const url = `mongodb+srv://binhnguyen:${password}@cluster0.ks5mlgy.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

// Schema
const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

// Model
const Note = mongoose.model('Note', noteSchema) 

// Retrieving from database
Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})

/*
// Create objects
const note = new Note({
    content: "HTML is easy",
    important: true
})

// Save objects
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
    console.log(result)
})


*/