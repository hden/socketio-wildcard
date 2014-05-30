'use strict'

Emitter = require('events').EventEmitter
emit    = Emitter.prototype.emit

onevent = (packet) ->
  args = packet.data or []

  if packet.id?
    args.push this.ack packet.id

  emit.apply this, args
  emit.call this, '*', packet

module.exports = ->
  (socket, next) ->
    return if socket.onevent is onevent
    socket.onevent = onevent
    next()
