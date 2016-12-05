'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var actorCtrlStub = {
  index: 'actorCtrl.index',
  show: 'actorCtrl.show',
  create: 'actorCtrl.create',
  upsert: 'actorCtrl.upsert',
  patch: 'actorCtrl.patch',
  destroy: 'actorCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var actorIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './actor.controller': actorCtrlStub
});

describe('Actor API Router:', function() {
  it('should return an express router instance', function() {
    actorIndex.should.equal(routerStub);
  });

  describe('GET /api/actors', function() {
    it('should route to actor.controller.index', function() {
      routerStub.get
        .withArgs('/', 'actorCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/actors/:id', function() {
    it('should route to actor.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'actorCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/actors', function() {
    it('should route to actor.controller.create', function() {
      routerStub.post
        .withArgs('/', 'actorCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/actors/:id', function() {
    it('should route to actor.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'actorCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/actors/:id', function() {
    it('should route to actor.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'actorCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/actors/:id', function() {
    it('should route to actor.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'actorCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
