/**
 * Admin model events
 */

'use strict';

import {EventEmitter} from 'events';
var Admin = require('../../sqldb').AdminLog;
var AdminEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AdminEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Admin.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    AdminEvents.emit(event + ':' + doc._id, doc);
    AdminEvents.emit(event, doc);
    done(null);
  };
}

export default AdminEvents;
