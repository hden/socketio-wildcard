socketio-wildcard
=================

[![Build Status](https://travis-ci.org/hden/socketio-wildcard.svg)](https://travis-ci.org/hden/socketio-wildcard)
[![Build Status](https://david-dm.org/hden/socketio-wildcard.png)](https://david-dm.org/hden/socketio-wildcard#info=devDependencies)

Socket.io with a wildcard event.
Works with Socket.io v1.0.x

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
