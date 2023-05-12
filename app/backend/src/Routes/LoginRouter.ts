import { Router } from 'express';
import LoginController from '../controller/LoginController';
import validateLogin from '../middlewares/validateLogin';
import validateToken from '../middlewares/validateToken';

const loginRouter = Router();
const loginController = new LoginController();

loginRouter.post('/', validateLogin, (_req, res) => loginController.login(_req, res));
loginRouter.get('/role', validateToken, (_req, res) => LoginController.loginRole(_req, res));

export default loginRouter;
