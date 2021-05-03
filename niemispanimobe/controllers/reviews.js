const reviewsRouter = require('express').Router()
const Review = require('../models/review')
const User = require('../models/user')
const Product = require('../models/product')

/*
Saves a review to the database
*/
reviewsRouter.post('/', async (request, response, next) => {

    try {

        const body = request.body
        const user = await User.findOne({username: body.user.username})
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