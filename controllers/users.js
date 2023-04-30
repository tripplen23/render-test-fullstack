const bcrypt = require('bcrypt') //  bcrypt package for generating the password hashes:
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body // Extracting username, name, and password from the request body

  const saltRounds = 10 // The number of salt rounds used for hashing the password. Higher value means more secure but slower hashing.
  const passwordHash = await bcrypt.hash(password, saltRounds) // The password sent in the request is not stored in the database. We store the hash of the password that is generated with the bcrypt.hash function.

  const user = new User({
    username,
    name,
    passwordHash,
  }) // Creating a new User object with the provided username, name, and hashed password

  const savedUser = await user.save() // Saving the user object to the database

  response.status(201).json(savedUser) // Sending a JSON response with the saved user object and setting the status code to 201 (Created)
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes', {
    content: 1,
    important: 1,
  })

  response.json(users)
})

module.exports = usersRouter
