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