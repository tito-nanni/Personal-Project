import express from 'express';
import * as reviewController from '../controllers/reviewController.js';

const router = express.Router();

router.get('/reviews', reviewController.getReviews);
router.get('/reviews/:reviewId', reviewController.getReviewsById);
router.post('/reviews', reviewController.createReview);
router.put('/reviews/:reviewId', reviewController.updateReview);
router.delete('/reviews/:reviewId', reviewController.deleteReview);

export default router;