const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const config = require('../utils/config')

/*
Logs the user in to the website
*/
loginRouter.post('/', async (request, response) => {

    const user = await User.findOne({username: request.body.username})

    if(user) {

        const passwordCorrect = await bcrypt.compare(request.body.password, user.passwordHash)
        
        if(!passwordCorrect) {

            return response.status(401).json({
            
                error: 'invalid username or password'

            })
        } 

    } else {

        return response.status(401).json({
        error: 'invalid username or password'
        
    })
}

    const userToken = {

        username: user.username,
        id: user._id

    }

    const token = jwt.sign(userToken, config.SECRET)

    return response.status(200).send({token, username: user.username, admin: user.admin})
    
})

module.exports = loginRouter