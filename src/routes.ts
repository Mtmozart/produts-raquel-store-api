import { Router } from 'express';
import { createUserController } from './useCases/CreateUser';
import { loginUserController } from './useCases/LoginUser';
import { checkUserController } from './useCases/CheckUser';
import { checkUserByIdController } from './useCases/CheckUserById';

const router = Router();

router.post('/users/create', (request, response) => {
  return createUserController.handle(request, response);
});
router.post('/users/login', (request, response) => {
  return loginUserController.handle(request, response);
});
router.get('/users/checkuser', (request, response) => {
  return checkUserController.handle(request, response);
});
router.get('/users/:slug', (request, response) => {
  return checkUserByIdController.handle(request, response);
});

export { router };
