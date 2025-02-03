// imports
import './ReviewForm.css'
import { useState } from "react"

// component 
const ReviewForm = ({ setReview }) => {
    // state variables
    const [reviewFormData, setReviewFormData] = useState({ text: '' })

    // handler functions
    const handleChange = (evt) => {
        setReviewFormData({...reviewFormData, [evt.targe.name]: evt.target.value })
    }

    const handleSubmit = (evt) => {
        evt.preventDefault()
        setReview(reviewFormData)
        setFormData({ text: '' })
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