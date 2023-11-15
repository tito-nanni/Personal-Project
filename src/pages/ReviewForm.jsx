import React, {useState} from "react";
import axios from "axios";

const ReviewForm = ({ productId, onNewReview }) => {
    const [reviewData, setReviewData] = useState({
        rating: '',
        comment: ''
    });
    const [submitError, setSubmitError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();

        //resetting any existing error messages
        setSubmitError('')

        //validation example
        if (!reviewData.rating || !reviewData.comment) {
            setSubmitError('Please provide both a rating and a comment');
            return;
        }

        try {
            const response = await axios.post(`/api/reviews`, {
                product_id: productId,
                rating: Number(reviewData.rating),
                comment: reviewData.comment,
                date: reviewData.date,
            });

            //invoke the callback to update the review list on the product page
            onNewReview(response.data);

            //clear the form data
            setReviewData({ rating: '', comment: ''});
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

    return (
        <div>
            <h3>Write a Review</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Rating:
                    <select
                    name="rating"
                    value={reviewData.rating}
                    onChange={handleInputChange}
                    >
                        <option value="">Choose a rating</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
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