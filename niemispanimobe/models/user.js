const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = mongoose.Schema({

    username: {

        type: String,
        unique: true,
        mingLength: 2,
        maxLength: 20
        
    },

    admin: Boolean,
    passwordHash: String,

    reviews: [

        {
            
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'

        }
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {

    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User