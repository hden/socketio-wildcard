/*global describe, before, it*/
'use strict'
var connect = require('socket.io-client')
var assert = require('power-assert')
var io = require('socket.io')()

var wildcard = require(__dirname + '/../')

describe('socket.io wildcard', function () {
  var nsp

  before(function () {
    var middleware = wildcard()
    nsp = io.of('/foo')
    io.use(middleware)
    nsp.use(middleware)
    io.listen(8000)
  })

  it('should work', function (done) {
    var client = connect('http://localhost:8000')

    client.on('connect', function () {
      client.emit('foo', { bar: 'baz' })
    })

    io.on('connection', function (socket) {
      var seq = []

      function check (d) {
        seq.push(d)
        if (seq.length === 2) {
          assert.deepEqual(seq, ['*', 'foo'])
          done()
        }
      }

      socket.on('*', function (packet) {
        assert.equal(packet.data[0], 'foo')
        assert.deepEqual(packet.data[1], { bar: 'baz' })
        check('*')
      })

      socket.on('foo', function (data) {
        assert.deepEqual(data, { bar: 'baz' })
        check('foo')
      })
    })
  })

  it('should work within namespace', function (done) {
    var client = connect('http://localhost:8000/foo')
    client.on('connect', function () {
      client.emit('foo', { bar: 'baz' })
    })

    nsp.on('connection', function (socket) {
      var seq = []

      function check (d) {
        seq.push(d)
        if (seq.length === 2) {
          assert.deepEqual(seq, ['*', 'foo'])
          done()
        }
      }

      socket.on('*', function (packet) {
        assert.equal(packet.data[0], 'foo')
        assert.deepEqual(packet.data[1], { bar: 'baz' })
        check('*')
      })

      socket.on('foo', function (data) {
        assert.deepEqual(data, { bar: 'baz' })
        check('foo')
      })
    })
  })
})
