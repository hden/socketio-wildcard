'use strict'
var BuiltInEmitter = require('events').EventEmitter
var isArray = Array.isArray || function (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

module.exports = function (CustomEmitter) {
  var Emitter = CustomEmitter || BuiltInEmitter
  var emit = Emitter.prototype.emit

  function onevent (packet) {
    var args = []

    if (isArray(packet.data)) {
      args = packet.data
    }
    if (packet.id != null) {
      args.push(this.ack(packet.id))
    }
    emit.call(this, '*', packet)
    return emit.apply(this, args)
  }

  return function (socket, next) {
    if (socket.onevent !== onevent) {
      socket.onevent = onevent
    }
    return next ? next() : null
  }
}
