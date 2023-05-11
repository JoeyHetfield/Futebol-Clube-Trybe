import { Router } from 'express';
import LoginController from '../controller/LoginController';
import validateLogin from '../middlewares/validateLogin';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', validateLogin, (_req, res) => loginController.login(_req, res));

export default loginRouter;
