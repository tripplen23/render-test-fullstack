const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  passwordHash: String,
  // TODO: The ids of the notes are stored within the user document as an array of Mongo ids
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId, // The type of the field is ObjectId that references note-style documents
      ref: 'Note',
    },
  ],
})

userSchema.plugin(uniqueValidator) // Use the unique validator that was added later on by mongoose

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  },
})

const User = mongoose.model('User', userSchema)

module.exports = User
