c = require('socket.io-client')('http://localhost:8000')
c.on 'connect', ->
  console.log 'client connected'
  c.emit 'foo'
