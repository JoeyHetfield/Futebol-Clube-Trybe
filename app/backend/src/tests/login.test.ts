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
    const { status, body } = await chai.request(app).post('/login').send({email: '', password: 'secret_admin'});

    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
  })
  it('Retorna erro quando não passa a senha', async () => {
    const { status, body } = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: ''});

    expect(status).to.be.equal(400);
    expect(body.message).to.be.equal('All fields must be filled');
  })
  it('Retorna erro se passa um email inválido', async () => {
    const { status, body } = await chai.request(app).post('/login').send({email: 'ASHCIUHSHadmcom', password: 'secret_admin'});

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  })
  it('Retorna erro se passa uma senha inválida', async () => {
    const { status, body } = await chai.request(app).post('/login').send({email: 'admin@admin', password:'123'});

    expect(status).to.be.equal(401);
    expect(body.message).to.be.equal('Invalid email or password');
  })
  it('Funciona corretamente se passa os dados válidos', async () => {
    const { status, body } = await chai.request(app).post('/login').send({email: 'admin@admin.com', password: 'secret_admin'});

    expect(status).to.be.equal(200);
    expect(body.token).to.be.a('string');
  }
  );
});