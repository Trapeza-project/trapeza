'use strict';

var app = require('../..');
import request from 'supertest';

var newData;

describe('Data API:', function() {
  describe('GET /api/datas', function() {
    var datas;

    beforeEach(function(done) {
      request(app)
        .get('/api/datas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          datas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      datas.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/datas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/datas')
        .send({
          name: 'New Data',
          info: 'This is the brand new data!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newData = res.body;
          done();
        });
    });

    it('should respond with the newly created data', function() {
      newData.name.should.equal('New Data');
      newData.info.should.equal('This is the brand new data!!!');
    });
  });

  describe('GET /api/datas/:id', function() {
    var data;

    beforeEach(function(done) {
      request(app)
        .get(`/api/datas/${newData._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          data = res.body;
          done();
        });
    });

    afterEach(function() {
      data = {};
    });

    it('should respond with the requested data', function() {
      data.name.should.equal('New Data');
      data.info.should.equal('This is the brand new data!!!');
    });
  });

  describe('PUT /api/datas/:id', function() {
    var updatedData;

    beforeEach(function(done) {
      request(app)
        .put(`/api/datas/${newData._id}`)
        .send({
          name: 'Updated Data',
          info: 'This is the updated data!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedData = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedData = {};
    });

    it('should respond with the original data', function() {
      updatedData.name.should.equal('New Data');
      updatedData.info.should.equal('This is the brand new data!!!');
    });

    it('should respond with the updated data on a subsequent GET', function(done) {
      request(app)
        .get(`/api/datas/${newData._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let data = res.body;

          data.name.should.equal('Updated Data');
          data.info.should.equal('This is the updated data!!!');

          done();
        });
    });
  });

  describe('PATCH /api/datas/:id', function() {
    var patchedData;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/datas/${newData._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Data' },
          { op: 'replace', path: '/info', value: 'This is the patched data!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedData = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedData = {};
    });

    it('should respond with the patched data', function() {
      patchedData.name.should.equal('Patched Data');
      patchedData.info.should.equal('This is the patched data!!!');
    });
  });

  describe('DELETE /api/datas/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/datas/${newData._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when data does not exist', function(done) {
      request(app)
        .delete(`/api/datas/${newData._id}`)
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
