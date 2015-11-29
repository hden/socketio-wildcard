'use strict'
var Emitter = require('events').EventEmitter
var emit = Emitter.prototype.emit

function onevent (packet) {
  var args
  args = packet.data || []
  if (packet.id != null) {
    args.push(this.ack(packet.id))
  }
  emit.call(this, '*', packet)
  return emit.apply(this, args)
}

module.exports = function () {
  return function (socket, next) {
    if (socket.onevent !== onevent) {
      socket.onevent = onevent
    }
    return next()
  }
}
