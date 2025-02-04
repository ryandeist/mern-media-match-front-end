// imports
import { UserContext } from '../../contexts/UserContext'
import './ReviewForm.css'
import { useContext, useEffect, useState } from "react"

// component 
const ReviewForm = ({  handleAddReview, isEditingReview, review, handleEditReview }) => {
    // context
    const { user } = useContext(UserContext)

    // state variables
    const [reviewFormData, setReviewFormData] = useState({
        text: '',
        author: user.username,
    })

    useEffect(() => {
        if (isEditingReview) {
            setReviewFormData(review)
        }
    }, [isEditingReview, review])

    // handler functions
    const handleChange = (evt) => {
        setReviewFormData({ ...reviewFormData, [evt.target.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        if (isEditingReview) {
            handleEditReview(reviewFormData)
        } else {
            handleAddReview(reviewFormData)
        }
        setReviewFormData({
            text: '',
            author: user.username,
        })
    }

    // return
    return (
        <form onSubmit={handleSubmit}>
            <textarea
                required
                name="text"
                type="text"
                id="text"
                value={reviewFormData.text}
                onChange={handleChange}
                className="review-form"
                placeholder="Write your review here..."
            />
            <div className='card-modal-review-btn'>
                <button type="submit" className='leave-a-review-btn'>{isEditingReview ? 'Update Review' : 'Leave a Review'}</button>
            </div>
        </form>
    )
}


export default ReviewForm
