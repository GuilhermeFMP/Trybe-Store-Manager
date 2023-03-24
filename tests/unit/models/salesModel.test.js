const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');

const { sales, withoutId, salesMock } = require('./mocks/sales.model.mock');

describe('Testes de unidade do model de sales', function () {
  it('Cadastrando uma data', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await salesModel.createDate();
    expect(result).to.equal(1);
  });

  it('Recuperando uma venda a partir do seu id', async function () {
    sinon.stub(connection, 'execute').resolves([withoutId]);
    const result = await salesModel.findbyId(1);
    expect(result).to.be.deep.equal(withoutId);
  });

  it('Cadastrando uma venda', async function () {
    sinon.stub(connection, 'execute').resolves([{ insertId: 1 }]);
    const result = await salesModel.insert(salesMock[0], 1);
    expect(result).to.equal(undefined);
  });

  afterEach(function () {
    sinon.restore();
  });
});