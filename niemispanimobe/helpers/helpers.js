const util = require('util')
const gc = require('../config/')
const bucket = gc.bucket('npanbucket') // should be your bucket name
const { format } = util

/*
Uploads a image to the Google cloud database
*/
const uploadImage = (file) => new Promise((resolve, reject) => {
  
  
    const { originalname, buffer } = file
    const blob = bucket.file(originalname.replace(/ /g, "_"))

    const blobStream = blob.createWriteStream({
      resumable: true
    })

  blobStream.on('finish', () => {
      const publicUrl = format(
      `https://storage.googleapis.com/${bucket.name}/${blob.name}`
    )
    resolve(publicUrl)
  })
  .on('error', (err) => {
      reject(`Unable to upload image, something went wrong`)
  })
  .end(buffer)
})

module.exports = {uploadImage}

