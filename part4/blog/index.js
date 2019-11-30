const app = require('./app') // the actual Express app
const http = require('http')
const config = require('./utils/config')

console.log('hererere1')
const server = http.createServer(app)

console.log('hererere')
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
