import { Router } from 'express';
import teamRouter from './TeamRoute';

const router = Router();

router.use('/teams', teamRouter);

export default router;
