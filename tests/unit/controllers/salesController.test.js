const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');

const { salesMock, newSaleMock } = require('./mocks/sales.controller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Teste de unidade do controller de sales', function () {
  describe('Cadastrando uma nova venda' ,function () {
    it('ao enviar os dados válidos deve salvar com sucesso!' , async function () {
      const res = {};
      const req = {
        body: salesMock
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'createSales')
        .resolves({ type: null, message: newSaleMock });

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(201); 
      expect(res.json).to.have.been.calledWith(newSaleMock);
    });

    it('ao enviar um ID invalido deve retornar um erro ', async function () {
      const res = {};
      const req = {
        body: [{
          productId: 'HA',
          quantity: 2,
        }]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'createSales')
        .resolves({ type: 'SERVER_ERROR', message: 'productId is required'});

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({ message: 'productId is required'});
    });
    
    it('ao enviar uma quantidade sen ser numero deve retornar um erro ', async function () {
      const res = {};
      const req = {
        body: [{
          productId: 1,
          quantity: 'HA',
        }]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'createSales')
        .resolves({ type: 'SERVER_ERROR', message: 'quantity is required'});

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(400); 
      expect(res.json).to.have.been.calledWith({message: 'quantity is required'});
    });

    it('ao enviar um ID abaixo de zero deve retornar um erro ', async function () {
      const res = {};
      const req = {
        body: [{
          productId: 1,
          quantity: -1,
        }]
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(salesService, 'createSales')
        .resolves({ type: 'INVALID_VALUE', message: '"quantity" must be greater than or equal to 1'});

      await salesController.createSale(req, res);

      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith({ message: '"quantity" must be greater than or equal to 1'});
    });
  });

  this.afterEach(function () {
    sinon.restore();
  })
});