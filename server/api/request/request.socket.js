/**
 * Broadcast updates to client when the model changes
 */

'use strict';

import RequestEvents from './request.events';

// Model events to emit
var events = ['save', 'remove'];

export function register(socket) {
  socket.on("new:lookup", function(data) {
    socket.broadcast.emit("lookup", data);
  });

  socket.on("answered:lookup", function(data) {
    socket.broadcast.emit("answered", data);
  })
  // Bind model events to socket events
  /*for(var i = 0, eventsLength = events.length; i < eventsLength; i++) {
    var event = events[i];
    var listener = createListener(`request:${event}`, socket);

    RequestEvents.on(event, listener);
    socket.on('disconnect', removeListener(event, listener));
  }*/
}


function createListener(event, socket) {
  return function(doc) {
    socket.emit(event, doc);
  };
}

function removeListener(event, listener) {
  return function() {
    RequestEvents.removeListener(event, listener);
  };
}
