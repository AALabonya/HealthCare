import express,{Request, Response} from 'express';
import { adminController } from './admin.controllers';

const router = express.Router();

router.get("/", adminController.getAllFromDB)

export const adminRoutes= router;