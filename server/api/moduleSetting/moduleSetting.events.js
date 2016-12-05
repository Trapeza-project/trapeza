/**
 * ModuleSetting model events
 */

'use strict';

import {EventEmitter} from 'events';
var ModuleSetting = require('../../sqldb').ModuleSetting;
var ModuleSettingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ModuleSettingEvents.setMaxListeners(0);

// Model events
var events = {
  afterCreate: 'save',
  afterUpdate: 'save',
  afterDestroy: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  ModuleSetting.hook(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc, options, done) {
    ModuleSettingEvents.emit(event + ':' + doc._id, doc);
    ModuleSettingEvents.emit(event, doc);
    done(null);
  };
}

export default ModuleSettingEvents;
