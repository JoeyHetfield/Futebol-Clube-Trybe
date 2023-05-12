import { Router } from 'express';
import MatchController from '../controller/MatchController';
import validateToken from '../middlewares/validateToken';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (_req, res) => matchController.getMatches(_req, res));
matchRouter.patch('/:id/finish', validateToken, (_req, res) =>
  matchController.finishMatch(_req, res));
matchRouter.patch('/:id', validateToken, (_req, res) =>
  matchController.updateMatch(_req, res));

export default matchRouter;
