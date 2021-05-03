const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({

    description: {

        type: String,
        required: true,
        minlength: 2

    },
    verdict: Number,
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
        
    },
    product: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'

    }
})

reviewSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review