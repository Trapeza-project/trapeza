'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var infotypeCtrlStub = {
  index: 'infotypeCtrl.index',
  show: 'infotypeCtrl.show',
  create: 'infotypeCtrl.create',
  upsert: 'infotypeCtrl.upsert',
  patch: 'infotypeCtrl.patch',
  destroy: 'infotypeCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var infotypeIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './infotype.controller': infotypeCtrlStub
});

describe('Infotype API Router:', function() {
  it('should return an express router instance', function() {
    infotypeIndex.should.equal(routerStub);
  });

  describe('GET /api/infotypes', function() {
    it('should route to infotype.controller.index', function() {
      routerStub.get
        .withArgs('/', 'infotypeCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/infotypes/:id', function() {
    it('should route to infotype.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'infotypeCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/infotypes', function() {
    it('should route to infotype.controller.create', function() {
      routerStub.post
        .withArgs('/', 'infotypeCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/infotypes/:id', function() {
    it('should route to infotype.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'infotypeCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/infotypes/:id', function() {
    it('should route to infotype.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'infotypeCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/infotypes/:id', function() {
    it('should route to infotype.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'infotypeCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
