import { Hono } from 'hono';
import { listUsers, getUserById, createUser, updateUser, deleteUser } from './user.controller';
import { zValidator } from '@hono/zod-validator';
import { userSchema } from '../validators';

export const usersRouter = new Hono();

usersRouter.get('/users', listUsers);
usersRouter.get('/users/:id', getUserById);
usersRouter.post('/users', zValidator('json', userSchema), createUser);
usersRouter.put('/users/:id', zValidator('json', userSchema), updateUser);
usersRouter.delete('/users/:id', deleteUser);
