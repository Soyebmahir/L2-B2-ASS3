import express from 'express'


import { ReviewController } from './review.controller';
import { ReviewValidation } from './review.validation';
import validateRequest from '../../middleware/validateRequest';




const router = express.Router();


router.post('/',
    validateRequest(ReviewValidation.reviewValidationSchema),
    ReviewController.createReview)
router.get('/', ReviewController.getAllReviews)



export const ReviewRoutes = router
