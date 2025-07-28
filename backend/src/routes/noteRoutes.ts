import { Router } from 'express';
import { getNotes, createNote } from '../controllers/noteController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// The authMiddleware will run before any route in this file
router.use(authMiddleware);

router.get('/', getNotes);
router.post('/', createNote);
// Delete route will be added later

export default router;