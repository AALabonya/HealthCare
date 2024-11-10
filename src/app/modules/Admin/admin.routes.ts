import express,{Request, Response} from 'express';
import { adminController } from './admin.controllers';

const router = express.Router();

router.get("/", adminController.getAllFromDB)
router.get('/:id', adminController.getByIdFromDB);
router.get('/:id', adminController.updateIntoDB);
router.delete('/:id', adminController.deleteFromDB);
export const adminRoutes= router;