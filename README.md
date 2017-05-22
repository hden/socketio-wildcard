socketio-wildcard
=================

[![Build Status](https://img.shields.io/travis/hden/socketio-wildcard.svg)](https://travis-ci.org/hden/socketio-wildcard)
[![Dependencies](https://img.shields.io/david/hden/socketio-wildcard.svg)](https://david-dm.org/hden/socketio-wildcard)
[![devDependencies](https://img.shields.io/david/dev/hden/socketio-wildcard.svg)](https://david-dm.org/hden/socketio-wildcard#info=devDependencies)
[![npm](https://img.shields.io/npm/dm/socketio-wildcard.svg)](https://www.npmjs.com/package/socketio-wildcard)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

[![npm](https://nodei.co/npm-dl/socketio-wildcard.png?height=3)](https://nodei.co/npm/socketio-wildcard/)

Socket.io with a wildcard event.

Works with Socket.io `v1.x` - `v2.x`.

Tested with node.js `v4.x`, `v5.x`, `v6.x`, `v7.x`.

Installation
------------

    npm install --save socketio-wildcard


Usage
-----

### Server

```js
var io         = require('socket.io')();
var middleware = require('socketio-wildcard')();

io.use(middleware);

io.on('connection', function(socket) {
  socket.on('*', function(packet){
    // client.emit('foo', 'bar', 'baz')
    packet.data === ['foo', 'bar', 'baz']
  });
});

io.listen(8000);
```

### Client

```js
var io = require('socket.io-client');
var socket = io('http://localhost');
// piggyback using the event-emitter bundled with socket.io client
var patch = require('socketio-wildcard')(io.Manager);
patch(socket);

socket.on('*', function(){ /* … */ })
```

Changelog
---------

### [2.0.0] - 2016-05-23
- no breaking change
- update test dependencies for socket.io v2

### [0.3.0] - 2015-12-21
- allow custom event emitter
- support socket.io client

### [0.2.0] - 2015-11-29
- wildcard listener for all events get called first ([@Michael77](https://github.com/Michael77))
- removed coffee-script dependency

Licence
-------
MIT
