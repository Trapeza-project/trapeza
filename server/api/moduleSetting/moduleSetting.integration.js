'use strict';

var app = require('../..');
import request from 'supertest';

var newModuleSetting;

describe('ModuleSetting API:', function() {
  describe('GET /api/moduleSettings', function() {
    var moduleSettings;

    beforeEach(function(done) {
      request(app)
        .get('/api/moduleSettings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          moduleSettings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      moduleSettings.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/moduleSettings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/moduleSettings')
        .send({
          name: 'New ModuleSetting',
          info: 'This is the brand new moduleSetting!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newModuleSetting = res.body;
          done();
        });
    });

    it('should respond with the newly created moduleSetting', function() {
      newModuleSetting.name.should.equal('New ModuleSetting');
      newModuleSetting.info.should.equal('This is the brand new moduleSetting!!!');
    });
  });

  describe('GET /api/moduleSettings/:id', function() {
    var moduleSetting;

    beforeEach(function(done) {
      request(app)
        .get(`/api/moduleSettings/${newModuleSetting._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          moduleSetting = res.body;
          done();
        });
    });

    afterEach(function() {
      moduleSetting = {};
    });

    it('should respond with the requested moduleSetting', function() {
      moduleSetting.name.should.equal('New ModuleSetting');
      moduleSetting.info.should.equal('This is the brand new moduleSetting!!!');
    });
  });

  describe('PUT /api/moduleSettings/:id', function() {
    var updatedModuleSetting;

    beforeEach(function(done) {
      request(app)
        .put(`/api/moduleSettings/${newModuleSetting._id}`)
        .send({
          name: 'Updated ModuleSetting',
          info: 'This is the updated moduleSetting!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedModuleSetting = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedModuleSetting = {};
    });

    it('should respond with the original moduleSetting', function() {
      updatedModuleSetting.name.should.equal('New ModuleSetting');
      updatedModuleSetting.info.should.equal('This is the brand new moduleSetting!!!');
    });

    it('should respond with the updated moduleSetting on a subsequent GET', function(done) {
      request(app)
        .get(`/api/moduleSettings/${newModuleSetting._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let moduleSetting = res.body;

          moduleSetting.name.should.equal('Updated ModuleSetting');
          moduleSetting.info.should.equal('This is the updated moduleSetting!!!');

          done();
        });
    });
  });

  describe('PATCH /api/moduleSettings/:id', function() {
    var patchedModuleSetting;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/moduleSettings/${newModuleSetting._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched ModuleSetting' },
          { op: 'replace', path: '/info', value: 'This is the patched moduleSetting!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedModuleSetting = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedModuleSetting = {};
    });

    it('should respond with the patched moduleSetting', function() {
      patchedModuleSetting.name.should.equal('Patched ModuleSetting');
      patchedModuleSetting.info.should.equal('This is the patched moduleSetting!!!');
    });
  });

  describe('DELETE /api/moduleSettings/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/moduleSettings/${newModuleSetting._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when moduleSetting does not exist', function(done) {
      request(app)
        .delete(`/api/moduleSettings/${newModuleSetting._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
