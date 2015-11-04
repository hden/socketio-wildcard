socketio-wildcard
=================

[![Build Status](https://img.shields.io/travis/hden/socketio-wildcard.svg)](https://travis-ci.org/hden/socketio-wildcard)
[![Build Status](https://img.shields.io/david/hden/socketio-wildcard.png)](https://david-dm.org/hden/socketio-wildcard)
[![Build Status](https://img.shields.io/david/dev/hden/socketio-wildcard.png)](https://david-dm.org/hden/socketio-wildcard#info=devDependencies)

[![NPM](https://nodei.co/npm-dl/socketio-wildcard.png?height=3)](https://nodei.co/npm/socketio-wildcard/)

Socket.io with a wildcard event.

Works with Socket.io v1.0.x - v1.3.x.

Tested with node.js `v0.10.x`, `v0.11.x`, `v0.12.x`, `v4.1.x`, `v4.2.x`, `v5.x`.

Installation
------------

    npm install --save socketio-wildcard


Usage
-----

    var io         = require('socket.io')();
    var middleware = require('socketio-wildcard')();

    io.use(middleware);

    io.on('connection', function(socket) {
      socket.on('*', function(){ /* … */ });
    });

    io.listen(8000);

Licence
-------
MIT
