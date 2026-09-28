import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';

const controller = new SessionsController();

const router = Router();

router.post('/register', controller.register);
router.post('/login', controller.login);
router.get('/current', controller.current);
router.post('/logout', controller.logout);

export default router;
