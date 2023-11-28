import React, {useState} from "react";
import axios from "axios";
import './ReviewForm.css'

const ReviewForm = ({ productId, onNewReview }) => {
    const [reviewData, setReviewData] = useState({
        rating: '',
        comment: ''
    });
    const [submitError, setSubmitError] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError('');
        setIsSubmitted(false); //reset submission status on new submission attempt

        //validation message
        if (!reviewData.rating || !reviewData.comment) {
            setSubmitError('Please provide both a rating and a comment');
            return;
        }

        try {
            const response = await axios.post(`/api/reviews`, {
                product_id: productId,
                rating: Number(reviewData.rating),
                comment: reviewData.comment,
            });

            //invoke the callback to update the review list on the product page
            onNewReview(response.data);
            setReviewData({ rating: '', comment: ''}); //clear form data
            setIsSubmitted(true); //set submission status to true on successful submission
        } catch (error) {
            console.error('error submitting review:', error.response?.data?.error || error.message);
            setSubmitError('failed to submit review. please try again')
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReviewData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    if (isSubmitted) {
        return <h3>Thank you for your feedback!</h3>
    }

    return (
        <div className="review-form-container">
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <label>
                    Rating:
                    <select
                    name="rating"
                    value={reviewData.rating}
                    onChange={handleInputChange}
                    >
                        <option value="">Choose a rating</option>
                        <option value="1">1-Terrible</option>
                        <option value="2">2-Bad</option>
                        <option value="3">3-Okay</option>
                        <option value="4">4-Good</option>
                        <option value="5">5-Great</option>
                    </select>
                </label>
                <label>
                    Comment:
                    <textarea
                    name="comment"
                    value={reviewData.comment}
                    onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Submit Review</button>
                {submitError && <p className="error">{submitError}</p>}
            </form>
        </div>
    )
}

export default ReviewForm;