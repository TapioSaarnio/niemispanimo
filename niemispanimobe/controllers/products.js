const productsRouter = require('express').Router()
const Product = require('../models/product')
const User = require('../models/user')
const {uploadImage} = require('../helpers/helpers')
const jwt = require('jsonwebtoken')


const getToken = request => {

    const auth = request.get('Authorization')
    if(auth && auth.toLowerCase().startsWith('bearer ')) {
        return auth.substring(7)
    }
    return null
    
}

/*
Returns all products
*/
productsRouter.get('/', (request, response) => {
    Product.find({}).populate({path: 'reviews', populate:{path: 'user', model: 'User'}}).then(ps => {
      
        response.json(ps.map(p => p.toJSON()))

    })
})

/*
Returns a product with a certain ID
*/
productsRouter.get('/:id', (request, response, next) => {

    Product.findById(request.params.id)
        .then(p => {
            if(p) {

                response.json(p.toJSON())

            }

            response.status(404).end()

        })

          .catch(error => next(error))
})

/*
Saves a product to the database
*/
productsRouter.post('/', async (req, res, next) => {

    try {

        const token = getToken(req)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if(!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid'})
        }

        const user = await User.findById(decodedToken.id)

        if(user.admin === false) {
            return res.status(403).json({ error: 'no admin rights'})
        }
        
        
        const pictureFile = req.file
        const imageUrl = await uploadImage(pictureFile)
  
        const product = new Product({
        
          name: req.body.name,
          description: req.body.description,
          type: req.body.type,
          image: imageUrl
          
        })
        
        const savedProduct = await product.save()

        res
            .status(200)
            .json({
            message: "Upload was successful",
            data: savedProduct.toJSON()
        })
  
      } catch (error) {

        next(error)

      }
    
})

module.exports = productsRouter