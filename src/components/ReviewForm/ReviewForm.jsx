import { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = () => {
  const [formData, setFormData] = useState({ comment: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="review-form-container">
      <form onSubmit={handleSubmit} className="review-form">
        <h2>Add Review</h2>
        <div>
          <label>Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="review-textarea"
          />
        </div>
        <button type="submit" className="submit-button">Submit Review</button>
      </form>
    </div>
  );
};

export default ReviewForm;