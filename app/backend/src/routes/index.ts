import { Router } from 'express';
import teamRouter from './TeamRouter';
import loginRouter from './LoginRouter';
import matchRouter from './MatchRouter';
import leaderBoardRouter from './LeaderBoardRoute';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
