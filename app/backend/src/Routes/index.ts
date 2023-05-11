import { Router } from 'express';
import teamRouter from './TeamRouter';
import loginRouter from './LoginRouter';

const router = Router();

router.use('/teams', teamRouter);
router.use('/login', loginRouter);

export default router;
