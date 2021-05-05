const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const path = require('path')

const server = http.createServer(app)
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../build', 'index.html')))

server.listen(config.PORT, () => {
  console.log(`Server running from port ${process.env.PORT}`)
})