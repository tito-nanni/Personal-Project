import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductReviews from './ProductReviews';
import ReviewForm from './ReviewForm';

const ReviewPage = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Fetch all reviews
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`/api/reviews`); // This gets all reviews
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, []);

    const onNewReview = (newReview) => {
        // Update the reviews state to include the new review
        setReviews(prevReviews => [...prevReviews, newReview]);
    };

    return (
        <div>
            {/* Render the list of reviews */}
            <h1>Product Reviews</h1>
            <ProductReviews reviews={reviews} />
            
            {/* Render the review form and pass the callback */}
            <ReviewForm onNewReview={onNewReview} />
        </div>
    );
};

export default ReviewPage;
