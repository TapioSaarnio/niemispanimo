const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

/*
Returns all users
*/
usersRouter.get('/', (request, response) => {

    User.find({}).then(u => {
        response.json(u.map(u => u.toJSON()))
    })
})

/*
Returns a user with a certain ID
*/
usersRouter.get('/:id', (request, response, next) => {


    User.findById(request.params.id).then(u => {
        if(u) {
        response.json(u => u.toJSON())
        }
        response.status(404).end()
    }).catch(error => next(error))
})

/*
Saves a user to the database
*/
usersRouter.post('/', async (request, response, next) => {

    try{

        const body = request.body        
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        console.log(body)
    
        const user = new User({
          username: body.username,
          admin: body.admin,
          passwordHash
        })
    
        const savedUser = await user.save()
    
        response.json(savedUser.toJSON())
    
      } catch (error) {
        next(error)
      }
})

module.exports = usersRouter