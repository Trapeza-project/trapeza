/**
 * Infotype model events
 */

'use strict';

import {EventEmitter} from 'events';
var Infotype = require('../../sqldb').Infotype;
var InfotypeEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
InfotypeEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Infotype.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    InfotypeEvents.emit(event + ':' + doc._id, doc);
    InfotypeEvents.emit(event, doc);
    done(null);
  };
}

export default InfotypeEvents;
