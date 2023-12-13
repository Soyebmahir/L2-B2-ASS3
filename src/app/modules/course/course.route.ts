import express from 'express'
import { CourseController } from './course.controller';
import validateRequest from '../../middleware/validateRequest';
import { CourseValidations } from './course.validation';

const router1 = express.Router();
const router2 = express.Router();

router1.post('/',
    validateRequest(CourseValidations.courseValidationSchema),
    CourseController.createCourse)
router1.get('/best', CourseController.getBestCourseWithReviewAverage)

router2.get('/', CourseController.getAllCourse)
router2.put('/:courseId', validateRequest(CourseValidations.updateCourseValidationSchema), CourseController.updateCourse)
router2.get('/:courseId/reviews', CourseController.getSingleCourseWithReviews)

export const CoursePostRoute = router1
export const CourseRoute = router2