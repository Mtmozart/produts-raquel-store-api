import { Router } from 'express';
import { createUserController } from './useCases/CreateUser';
import { loginUserController } from './useCases/LoginUser';

const router = Router();

router.post('/users/create', (request, response) => {
  return createUserController.handle(request, response);
});
router.post('/users/login', (request, response) => {
  return loginUserController.handle(request, response);
});

export { router };
