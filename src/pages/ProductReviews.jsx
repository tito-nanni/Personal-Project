import React, {useState, useEffect} from "react";
import axios from 'axios'
import './ProductReviews.css'

const ProductReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        const fetchProductReviews = async () => {
            try {
                const response = await axios.get(`/api/reviews`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews', error);
            }
        };

        fetchProductReviews()
    }, [productId]);

    return (
        <div className="reviews-list">
            {reviews.map(review => (
                <div key={review.review_id} className="review-item">
                    <p className="review-comment">-{review.comment}</p>
                    <span className="review-rating">{review.rating}/5</span>
                    </div>
            ))}
        </div>
    )
};

export default ProductReviews; 