'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var moduleSettingCtrlStub = {
  index: 'moduleSettingCtrl.index',
  show: 'moduleSettingCtrl.show',
  create: 'moduleSettingCtrl.create',
  upsert: 'moduleSettingCtrl.upsert',
  patch: 'moduleSettingCtrl.patch',
  destroy: 'moduleSettingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var moduleSettingIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './moduleSetting.controller': moduleSettingCtrlStub
});

describe('ModuleSetting API Router:', function() {
  it('should return an express router instance', function() {
    moduleSettingIndex.should.equal(routerStub);
  });

  describe('GET /api/moduleSettings', function() {
    it('should route to moduleSetting.controller.index', function() {
      routerStub.get
        .withArgs('/', 'moduleSettingCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/moduleSettings/:id', function() {
    it('should route to moduleSetting.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'moduleSettingCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/moduleSettings', function() {
    it('should route to moduleSetting.controller.create', function() {
      routerStub.post
        .withArgs('/', 'moduleSettingCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/moduleSettings/:id', function() {
    it('should route to moduleSetting.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'moduleSettingCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/moduleSettings/:id', function() {
    it('should route to moduleSetting.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'moduleSettingCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/moduleSettings/:id', function() {
    it('should route to moduleSetting.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'moduleSettingCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
