import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardRouter = Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get('/home', (_req, res) => leaderBoardController.getLeaderBoardHome(_req, res));
leaderBoardRouter.get('/away', (_req, res) => leaderBoardController.getLeaderBoardAway(_req, res));
leaderBoardRouter.get('/', (_req, res) => leaderBoardController.getLeaderBoard(_req, res));

export default leaderBoardRouter;
