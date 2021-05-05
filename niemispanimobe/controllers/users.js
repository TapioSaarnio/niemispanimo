const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')




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