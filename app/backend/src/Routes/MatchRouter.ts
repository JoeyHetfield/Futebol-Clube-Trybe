import { Router } from 'express';
import MatchController from '../controller/MatchController';

const matchRouter = Router();
const matchController = new MatchController();

matchRouter.get('/', (_req, res) => matchController.getMatches(_req, res));

export default matchRouter;
