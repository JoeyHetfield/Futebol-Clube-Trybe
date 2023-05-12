import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import getMatchesMock from './mock/match.mock';
import getMatchesInProgressMock from './mock/match.mock';
import Match from '../database/models/Match';

chai.use(chaiHttp);

const { expect } = chai;

describe('Se getMatches funciona', () => {
  let matchModelStub: sinon.SinonStub;

  beforeEach(() => {
    matchModelStub = sinon.stub(Match, 'findAll').resolves(getMatchesMock as unknown as Match[]);
  })

  afterEach(() => {
    matchModelStub.restore();
  })

  it('getMatches retorna todos os jogos', async () => {
    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getMatchesMock);
  })
});