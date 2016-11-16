/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/moduleSettings', require('./api/moduleSetting'));
  app.use('/api/admins', require('./api/admin'));
  app.use('/api/datas', require('./api/data'));
  app.use('/api/infotypes', require('./api/infotype'));
  app.use('/api/actors', require('./api/actor'));
  app.use('/api/requests', require('./api/request'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/customerusers', require('./api/customeruser'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(`${app.get('appPath')}/index.html`));
    });
}
