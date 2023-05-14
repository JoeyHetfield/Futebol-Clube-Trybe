import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import getMatchesMock from './mock/match.mock';
import getMatchesInProgessTrueMock from './mock/match.mock';
import getMatchesInProgessFalseMock from './mock/match.mock';
import Match from '../database/models/Match';
import Jwt from '../utils/auth';

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
  it('getMatches retorna todos os jogos em andamento', async () => {
    const { status, body } = await chai.request(app).get('/matches?inProgress=true');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getMatchesInProgessTrueMock);
  });
  it('getMatches retorna todos os jogos finalizados', async () => {
    const { status, body } = await chai.request(app).get('/matches?inProgress=false');

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal(getMatchesInProgessFalseMock);
  });
  it('finishMatch não altera porque não foi passado um token', async () => {
    const { status, body } = (await chai.request(app).patch('/matches/1/finish'));

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token not found' });
  });
  it('finishMatch não altera porque não foi passado um token válido', async () => {
    const { status, body } = (await chai.request(app).patch('/matches/1/finish').set('Authorization', 'token teste'));

    expect(status).to.be.equal(401);
    expect(body).to.be.deep.equal({ message: 'Token must be a valid token' });
  })

  it('finishMatch altera o jogo para finalizado', async () => {
    const mockUser = {
      id: 1,
      email: 'admin@admin.com',
      role: 'admin'
    }

    const token = new Jwt().createToken(mockUser);
   
    const { status, body } = (await chai.request(app).patch('/matches/41/finish').set('Authorization', token));

    console.log(status, body); 

    expect(status).to.be.equal(200);
    expect(body).to.be.deep.equal({ message: 'Finished' });

  });
});