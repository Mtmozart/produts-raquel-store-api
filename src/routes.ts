import { Router } from 'express';
import { createUserController } from './useCases/User/CreateUser';
import { loginUserController } from './useCases/User/LoginUser';
import { checkUserController } from './useCases/User/CheckUser';
import { checkUserByIdController } from './useCases/User/CheckUserById';
import { updateUserController } from './useCases/User/UpdateUser';
//products
import { createProductController } from './useCases/Products/CreateProduct';
import { checkProductByIdController } from './useCases/Products/CheckProductById';

//Middleware
import { verifyToken } from './services/JsonWebToken/VerifyToken';
import { verifyTokenIdM } from './utils/Middleware/CheckUserByIdMiddleware';
import { verifyTokenId } from './services/JsonWebToken/VerifyTokenId';

const router = Router();
//userRoutes
router.post('/users/create', (request, response) => {
  return createUserController.handle(request, response);
});
router.post('/users/login', (request, response) => {
  return loginUserController.handle(request, response);
});
router.get('/users/checkuser', (request, response) => {
  return checkUserController.handle(request, response);
});
router.get('/users/:slug', verifyToken.execute, (request, response) => {
  return checkUserByIdController.handle(request, response);
});
router.patch(
  '/users/edit/:slug',
  verifyTokenIdM.execute,
  (request, response) => {
    return updateUserController.handle(request, response);
  },
);

//Products Routes
router.post(
  '/product/:slug/create',
  verifyTokenIdM.execute,
  (request, response) => {
    return createProductController.handle(request, response);
  },
);

router.get('/product/:slug', verifyTokenId.execute, (request, response) => {
  return checkProductByIdController.handle(request, response);
});

export { router };
