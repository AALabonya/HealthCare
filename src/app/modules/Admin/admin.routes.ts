import express,{Request, Response} from 'express';
import { adminController } from './admin.controllers';

const router = express.Router();

router.get("/", adminController.getAllFromDB)
router.get('/:id', adminController.getByIdFromDB);
export const adminRoutes= router;