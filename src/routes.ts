import { Router } from 'express';

const router = Router();

router.post('/', (request, response) => {
  return response.status(201).send('deu certo'), console.log(201);
});

export { router };
