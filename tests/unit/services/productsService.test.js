const { expect } = require('chai');
const sinon = require('sinon');
const { productsService } = require('../../../src/services');
const { productsModel } = require('../../../src/models');

const { allProducts } = require('./mocks/products.service.mock');

describe('Teste de unidade da service de produtos', function () {
  describe('listagem de produtos', function () {
    it('retorna a lista completa de produtos', async function () {
      sinon.stub(productsModel, 'findAll').resolves(allProducts);
      const result = await productsService.findAll();
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });

    it('retorna um erro caso o produto não exista', async function () {
      sinon.stub(productsModel, 'findById').resolves(undefined);
      const result = await productsService.findById(99);
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });

    it('retorna o produto caso ID existente', async function () {
      sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
      const result = await productsService.findById(1);
      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allProducts[0]);
    });
  });
  afterEach(function () {
    sinon.restore();
  });
}); 
