import { Router } from 'express';
import TeamController from '../controller/TeamController';

const teamRouter = Router();
const teamController = new TeamController();

teamRouter.get('/', (_req, res) => teamController.getTeams(_req, res));

export default teamRouter;
