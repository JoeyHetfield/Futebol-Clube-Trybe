import { Router } from 'express';
import teamRouter from './TeamRouter';
import loginRouter from './LoginRouter';
import matchRouter from './MatchRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
