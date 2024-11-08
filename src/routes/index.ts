// src/routes/index.ts
import { Router } from 'express';
import userRoutes from './users';
import screenshot from './screenshot'
import login from './login';

const router = Router();

// Use user routes
router.use('/users', userRoutes);
router.use('/ss', screenshot);
router.use('/auth', login);

export default router;
