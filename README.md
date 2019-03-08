socketio-wildcard
=================

[![Build Status](https://img.shields.io/travis/hden/socketio-wildcard.svg)](https://travis-ci.org/hden/socketio-wildcard)
[![Dependencies](https://img.shields.io/david/hden/socketio-wildcard.svg)](https://david-dm.org/hden/socketio-wildcard)
[![devDependencies](https://img.shields.io/david/dev/hden/socketio-wildcard.svg)](https://david-dm.org/hden/socketio-wildcard#info=devDependencies)
[![npm](https://img.shields.io/npm/dm/socketio-wildcard.svg)](https://www.npmjs.com/package/socketio-wildcard)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
[![codecov](https://codecov.io/gh/hden/socketio-wildcard/branch/master/graph/badge.svg)](https://codecov.io/gh/hden/socketio-wildcard)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhden%2Fsocketio-wildcard.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhden%2Fsocketio-wildcard?ref=badge_shield)

[![npm](https://nodei.co/npm-dl/socketio-wildcard.png?height=3)](https://nodei.co/npm/socketio-wildcard/)

Socket.io with a wildcard event.

Works with Socket.io `v1.x` - `v2.x`.

Tested with node.js `v6.x`, `v7.x`, `v8.x`, , `v10.x`.

Sunsetting
----------
As of Socket.io v2.0.4 ([commit](https://github.com/socketio/socket.io/commit/5a123beea597c9fda7b722f18343fdc2c2755e79#diff-9b2f90c89d460ee80ced18e01748824e)), you can use a socket middleware to catch every incoming Packet, which satisfies most of socketio-wildcard's use cases.

```js
io.on('connection', (socket) => {
  socket.use((packet, next) => {
    // Handler
    next();
  });
});
```

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

### Server (with a namespace)

```diff
var io         = require('socket.io')();
+var nsp        = io.of('/namespace');
var middleware = require('socketio-wildcard')();

-io.use(middleware);
+nsp.use(middleware);

-io.on('connection', function(socket) {
+nsp.on('connection', function(socket) {
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


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fhden%2Fsocketio-wildcard.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fhden%2Fsocketio-wildcard?ref=badge_large)
