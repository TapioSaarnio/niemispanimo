const reviewsRouter = require('express').Router()
const Review = require('../models/review')
const User = require('../models/user')
const Product = require('../models/product')
const jwt = require('jsonwebtoken')

const getToken = request => {

    console.log('request')
    console.log(request)

    const auth = request.get('Authorization')
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
}



/*
Saves a review to the database
*/
reviewsRouter.post('/', async (request, response, next) => {

    try {

        const token = getToken(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid'})
        }

        const body = request.body
        const user = await User.findById(decodedToken.id)
        const product = await Product.findOne({name: body.product.name})

        const review = new Review({

            description: body.description,
            verdict: body.verdict,
            user: user._id,
            product: product._id

        })

        const savedReview = await review.save()
        user.reviews = user.reviews.concat(savedReview._id)
        product.reviews = product.reviews.concat(savedReview._id)
        await product.save()
        await user.save()
        response.json(savedReview.toJSON())

    } catch (error) {
        next(error)
    }

})

module.exports = reviewsRouter