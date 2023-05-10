import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import TeamModel from '../model/TeamModel';
import getTeamsMock from './mock/team.mock';
import get1TeamMock from './mock/team.mock';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('getTeams funciona', () => {
    let teamModelStub: sinon.SinonStub;

    beforeEach(() => {
        teamModelStub = sinon.stub(Team, 'findAll').resolves(getTeamsMock as unknown as Team[]);
        
    });

    afterEach (() => {
        teamModelStub.restore();
    });

    it('getTeams retorna todos os times', async () => {
       const { status, body } = await chai.request(app).get('/teams')

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(getTeamsMock);
    });
});

describe('get1Team funciona', () => {
    let teamModelStub: sinon.SinonStub;

    beforeEach(() => {
        teamModelStub = sinon.stub(Team, 'findByPk').resolves(get1TeamMock as unknown as Team);
        
    });

    afterEach (() => {
        teamModelStub.restore();
    });

    it('get1Team retorna um time', async () => {
       const { status, body } = await chai.request(app).get('/teams/16')

        expect(status).to.be.equal(200);
        expect(body).to.be.deep.equal(get1TeamMock);
    });
});
