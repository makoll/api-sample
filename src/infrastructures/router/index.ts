import 'express-async-errors';

import express, { Request, Response } from 'express';

import { HealthCheckController } from '@/interfaces/controllers/HealthCheckController';
import { UserController } from '@/interfaces/controllers/UserController';

const userController = new UserController();

export const router = express.Router();

router.get('/healthcheck', async (req: Request, res: Response) => {
  const result = await new HealthCheckController().check();
  res.send(result);
});

router.get('/users/:id', async (req: Request, res: Response) => {
  const result = await userController.findUser(req.params.id);
  res.send(result);
});

router.put('/users/:id', async (req: Request, res: Response) => {
  const result = await userController.updateUser(req.params.id, req.body);
  res.send(result);
});
