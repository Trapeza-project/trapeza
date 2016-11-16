'use strict';

var app = require('../..');
import request from 'supertest';

var newInfotype;

describe('Infotype API:', function() {
  describe('GET /api/infotypes', function() {
    var infotypes;

    beforeEach(function(done) {
      request(app)
        .get('/api/infotypes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          infotypes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      infotypes.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/infotypes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/infotypes')
        .send({
          name: 'New Infotype',
          info: 'This is the brand new infotype!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newInfotype = res.body;
          done();
        });
    });

    it('should respond with the newly created infotype', function() {
      newInfotype.name.should.equal('New Infotype');
      newInfotype.info.should.equal('This is the brand new infotype!!!');
    });
  });

  describe('GET /api/infotypes/:id', function() {
    var infotype;

    beforeEach(function(done) {
      request(app)
        .get(`/api/infotypes/${newInfotype._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          infotype = res.body;
          done();
        });
    });

    afterEach(function() {
      infotype = {};
    });

    it('should respond with the requested infotype', function() {
      infotype.name.should.equal('New Infotype');
      infotype.info.should.equal('This is the brand new infotype!!!');
    });
  });

  describe('PUT /api/infotypes/:id', function() {
    var updatedInfotype;

    beforeEach(function(done) {
      request(app)
        .put(`/api/infotypes/${newInfotype._id}`)
        .send({
          name: 'Updated Infotype',
          info: 'This is the updated infotype!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedInfotype = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedInfotype = {};
    });

    it('should respond with the original infotype', function() {
      updatedInfotype.name.should.equal('New Infotype');
      updatedInfotype.info.should.equal('This is the brand new infotype!!!');
    });

    it('should respond with the updated infotype on a subsequent GET', function(done) {
      request(app)
        .get(`/api/infotypes/${newInfotype._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let infotype = res.body;

          infotype.name.should.equal('Updated Infotype');
          infotype.info.should.equal('This is the updated infotype!!!');

          done();
        });
    });
  });

  describe('PATCH /api/infotypes/:id', function() {
    var patchedInfotype;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/infotypes/${newInfotype._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Infotype' },
          { op: 'replace', path: '/info', value: 'This is the patched infotype!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedInfotype = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedInfotype = {};
    });

    it('should respond with the patched infotype', function() {
      patchedInfotype.name.should.equal('Patched Infotype');
      patchedInfotype.info.should.equal('This is the patched infotype!!!');
    });
  });

  describe('DELETE /api/infotypes/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/infotypes/${newInfotype._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when infotype does not exist', function(done) {
      request(app)
        .delete(`/api/infotypes/${newInfotype._id}`)
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
