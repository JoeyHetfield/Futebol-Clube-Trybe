import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando o Login', () => {
  afterEach(sinon.restore);

  it('Retorna erro quando não passa o email', async () => {
    const { status, body } = await chai.request(app).post('/login').send({user: '', password: 'secret_admin'});

    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
  })
  it('Retorna erro quando não passa a senha', async () => {
    const { status, body } = await chai.request(app).post('/login').send({user: 'admin@admin.com', password: ''});

    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
  }
  );
});