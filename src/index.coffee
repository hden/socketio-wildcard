'use strict'

Emitter = require('events').EventEmitter
emit    = Emitter::emit

onevent = (packet) ->
  args = packet.data or []

  if packet.id?
    args.push this.ack packet.id

  emit.apply this, args
  emit.call this, '*', packet

module.exports = ->
  (socket, next) ->
    socket.onevent = onevent unless socket.onevent is onevent
    next()
