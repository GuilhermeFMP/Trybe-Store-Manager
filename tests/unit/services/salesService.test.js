const { expect } = require('chai');
const sinon = require('sinon');
const { salesService } = require('../../../src/services');
const { salesModel, productsModel } = require('../../../src/models');

describe('Teste de unidade da service de sales', function () {
  describe('Cadastro de uma venda', function () {
    it('Passando um valor invalido', async function () {
      const result = await salesService.createSales([{
        quantity: 2,
      }]);
      expect(result.type).to.be.equal('INVALID_VALUE');
      expect(result.message).to.deep.equal('"productId" is required');
    });

    it('Passando valores validos', async function () {
      sinon.stub(salesModel, 'insert').resolves(1)
      sinon.stub(salesModel, 'findbyId').resolves([{
        productId: 1,
        quantity: 1,
      }]);

      const result = await salesService.createSales([{
        productId: 1,
        quantity: 1,
      }]);
      expect(result.type).to.be.equal(null);
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});