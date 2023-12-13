import express from 'express'

import validateRequest from '../../middleware/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryController } from './categroy.controller';


const router = express.Router();


router.post('/', validateRequest(CategoryValidations.CategoryValidationSchema), CategoryController.createCategory)
router.get('/', CategoryController.getAllCategories)



export const CategoryRoutes = router
