import express from 'express';
import { AdminController } from './admin.controllers';
import validateRequest from '../../middlewares/validationRequest';
import { adminValidationSchema } from './admin.validations';


const router = express.Router();

router.get('/', AdminController.getAllFromDB);

router.get('/:id', AdminController.getByIdFromDB);

router.patch('/:id', validateRequest(adminValidationSchema.update), AdminController.updateIntoDB);

router.delete('/:id', AdminController.deleteFromDB);

router.delete('/soft/:id', AdminController.softDeleteFromDB);

export const AdminRoutes = router;