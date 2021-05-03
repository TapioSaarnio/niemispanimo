const Cloud = require('@google-cloud/storage')

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: process.env.SERVICEKEY,
  projectId: 'sonic-progress-302121',
})

module.exports = storage
