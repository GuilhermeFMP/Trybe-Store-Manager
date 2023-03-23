const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');

const { productListMock, productMock, newProductMock } = require('./mocks/products.controller.mock');

describe('Teste de unidade do controller de produtos', function () {
  describe('Listando os produtos', function () {
    it('deve retornar o status 200 e a lista', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findAll')
        .resolves({ type: null, message: productListMock });
      
      await productsController.listProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(productListMock);
    });
  });

  describe('Buscando um produto', function () {
    it('deve responder com 200 e os dados do banco quando existir', async function () {
      const res = {};
      const req = {
        params: { id: 1 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findById')
        .resolves({ type: null, message: productListMock[0] });
      
      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith( productListMock[0] );
    });

    it('ao passar um id que não existe no banco deve retornar um erro', async function () {
      const res = {};
      const req = {
        params: { id: 99 },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'findById')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
      
      await productsController.getProducts(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  describe('Cadastrando um novo produto', function () {
    it('ao enviar dados válidos deve salvar com sucesso!', async function () {
      const res = {};
      const req = {
        body: productMock,
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'createProduct')
        .resolves({ type: null, message: newProductMock });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(201); 
      expect(res.json).to.have.been.calledWith(newProductMock);
    });

    it('ao enviar um nome com menos de 5 caracteres deve retornar um erro!', async function () {
      const res = {};
      const req = {
        body: {
          name: 'HA',
        },
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsService, 'createProduct')
        .resolves({ 
          type: 'INVALID_VALUE', message: '"name" length must be at least 5 characters long' });

      await productsController.createProduct(req, res);

      expect(res.status).to.have.been.calledWith(422); 
      expect(res.json).to.have.been.calledWith('"name" length must be at least 5 characters long');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});