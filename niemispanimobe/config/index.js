const Cloud = require('@google-cloud/storage')
const path = require('path')
const key = path.join(__dirname, 'keys2.json')


const { Storage } = Cloud
const storage = new Storage({
  keyFilename: key,
  projectId: 'sonic-progress-302121',
})

module.exports = storage
