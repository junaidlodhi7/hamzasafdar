import { Router } from 'express';
import {
    takeScreeshot
} from '../controller/screenshot';
import { authMiddleware } from '../middleware/authentication';
const router = Router();

router.post('/',authMiddleware ,takeScreeshot);

export default router;
