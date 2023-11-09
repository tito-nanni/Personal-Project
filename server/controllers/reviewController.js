import { Review } from '../model.js';

// Fetch all reviews
export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fetch a single review by ID
export const getReviewsById = async (req, res) => {
    try {
        const review = await Review.findByPk(req.params.reviewId);
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new review
export const createReview = async (req, res) => {
    try {
        const review = await Review.create(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a review
export const updateReview = async (req, res) => {
    try {
        const updated = await Review.update(req.body, {
            where: { review_id: req.params.reviewId },
        });
        if (updated) {
            res.status(200).json({ message: 'Review updated successfully'});
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// Delete a review
export const deleteReview = async (req, res) => {
    try {
        const deleted = await Review.destroy({
            where: { review_id: req.params.reviewId },
        });
        if (deleted) {
            res.status(200).json({ message: 'Review deleted successfully' });
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}