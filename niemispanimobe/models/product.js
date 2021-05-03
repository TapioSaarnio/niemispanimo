const mongoose = require('mongoose')

    const productSchema = new mongoose.Schema({
        name: String,
        description: String,
        type: String,
        image: String,
        reviews: [{
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }]

   })

   productSchema.set('toJSON', {
       transform: (document, returnedObject) => {
           returnedObject.id = returnedObject._id.toString()
           delete returnedObject._id
           delete returnedObject.__v

       }
   })

   const Product = mongoose.model('Product', productSchema)

   module.exports = Product