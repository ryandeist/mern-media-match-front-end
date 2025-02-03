// imports
import './ReviewForm.css'
import { useState } from "react"

// component 
const ReviewForm = ({ setIsModalOpen, handleAddReview }) => {
    // state variables
    const [reviewFormData, setReviewFormData] = useState({ text: '' })

    // handler functions
    const handleChange = (evt) => {
        setReviewFormData({ ...reviewFormData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        handleAddReview(reviewFormData)
        setReviewFormData({ text: '' })
        setIsModalOpen(false)
    }

    // return
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                required
                name="text"
                type="text"
                id="text"
                value={FormData.text}
                onChange={handleChange}
                className="review-form"
                placeholder="Write your review here..."
            />
            <div className='card-modal-review-btn'>
                <button type="submit" className='leave-a-review-btn'>Leave a Review</button>
            </div>
        </form>
    )
}


export default ReviewForm
