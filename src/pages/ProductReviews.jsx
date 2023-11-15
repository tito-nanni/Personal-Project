import React, {useState, useEffect} from "react";
import axios from 'axios'

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
        <div>
            {reviews.map(review => (
                <div key={review.review_id}>
                    <p>-{review.comment} - {review.rating}/5</p>
                    </div>
            ))}
        </div>
    )
};

export default ProductReviews; 