import { Router } from 'express';
import LoginController from '../controller/LoginController';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', (_req, res) => loginController.login(_req, res));

export default loginRouter;
