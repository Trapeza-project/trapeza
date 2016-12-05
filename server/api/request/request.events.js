/**
 * Request model events
 */

'use strict';

import {EventEmitter} from 'events';
var RequestLog = require('../../sqldb').RequestLog;
var RequestEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
RequestEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  RequestLog.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    RequestEvents.emit(event + ':' + doc._id, doc);
    RequestEvents.emit(event, doc);
    done(null);
  };
}

export default RequestEvents;
