'use strict';

var app = require('../..');
import request from 'supertest';

var newActor;

describe('Actor API:', function() {
  describe('GET /api/actors', function() {
    var actors;

    beforeEach(function(done) {
      request(app)
        .get('/api/actors')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          actors = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      actors.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/actors', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/actors')
        .send({
          name: 'New Actor',
          info: 'This is the brand new actor!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newActor = res.body;
          done();
        });
    });

    it('should respond with the newly created actor', function() {
      newActor.name.should.equal('New Actor');
      newActor.info.should.equal('This is the brand new actor!!!');
    });
  });

  describe('GET /api/actors/:id', function() {
    var actor;

    beforeEach(function(done) {
      request(app)
        .get(`/api/actors/${newActor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          actor = res.body;
          done();
        });
    });

    afterEach(function() {
      actor = {};
    });

    it('should respond with the requested actor', function() {
      actor.name.should.equal('New Actor');
      actor.info.should.equal('This is the brand new actor!!!');
    });
  });

  describe('PUT /api/actors/:id', function() {
    var updatedActor;

    beforeEach(function(done) {
      request(app)
        .put(`/api/actors/${newActor._id}`)
        .send({
          name: 'Updated Actor',
          info: 'This is the updated actor!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedActor = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedActor = {};
    });

    it('should respond with the original actor', function() {
      updatedActor.name.should.equal('New Actor');
      updatedActor.info.should.equal('This is the brand new actor!!!');
    });

    it('should respond with the updated actor on a subsequent GET', function(done) {
      request(app)
        .get(`/api/actors/${newActor._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let actor = res.body;

          actor.name.should.equal('Updated Actor');
          actor.info.should.equal('This is the updated actor!!!');

          done();
        });
    });
  });

  describe('PATCH /api/actors/:id', function() {
    var patchedActor;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/actors/${newActor._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Actor' },
          { op: 'replace', path: '/info', value: 'This is the patched actor!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedActor = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedActor = {};
    });

    it('should respond with the patched actor', function() {
      patchedActor.name.should.equal('Patched Actor');
      patchedActor.info.should.equal('This is the patched actor!!!');
    });
  });

  describe('DELETE /api/actors/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/actors/${newActor._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when actor does not exist', function(done) {
      request(app)
        .delete(`/api/actors/${newActor._id}`)
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
