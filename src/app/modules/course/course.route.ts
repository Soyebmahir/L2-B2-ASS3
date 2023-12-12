import express from 'express'
import { CourseController } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';

const router = express.Router();
router.post('/', validateRequest(CourseValidations.courseValidationSchema), CourseController.createCourse)

export const CourseRoutes = router