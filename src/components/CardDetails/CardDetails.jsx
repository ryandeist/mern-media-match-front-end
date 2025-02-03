// imports
import './CardDetails.css'
import { addToCart, removeFromCart } from '../../services/cartService'
import { useContext, useEffect, useState } from "react"
import { purchase, removeFromLibrary } from '../../services/libraryService'
import { UserContext } from "../../contexts/UserContext"
import { useLocation } from 'react-router'
import ReviewForm from '../ReviewForm/ReviewForm'
import { createReview, deleteReview, findReviews, updateReview } from '../../services/reviewService'

const media = import.meta.glob('../../assets/*.png')

// hooks
const CardDetails = ({ setLibrary, setCart, gameData, selectedGame, onClose, setGameData, setIsModalOpen, setReset, reset }) => {
  const { user } = useContext(UserContext)
  const location = useLocation()

  // state variables
  const [review, setReview] = useState({
    text: '',
    author: '',
  })

  // use effect 
  useEffect(() => {
    if (location.pathname === '/library') {
      const fetchReview = async () => {
        try {
            const fetchedReview = await findReviews(selectedGame._id)
            console.log(fetchedReview)
            setReview({
              text: fetchedReview.text,
              author: fetchedReview.author
            })
          // using product id and review id(?)
          // may be a good idea to rewrite the index so only need product id and user is to findOne
          // if i use the current routs, it is
          // const fetchedReview = await findReview(????, ?????)
          // see your review
          // but only need to pass product id if i go the other way
          // i.e. // findReviews(????)
          // pull review from db, if there is one, set Review.
          // setReview(fetchedReview)

          console.log('Prof Plum in Library with Banana')
        } catch (err) {
          console.log('Error fetching review', err)
        }
      }
      fetchReview()
    } 
}, [])

if (!selectedGame) return setIsModalOpen(false)

  // handler functions
  const handleAddToCart = async (buttonName) => {
    try {
      if (buttonName === 'add') await addToCart(user._id, selectedGame)
      setGameData((prev) => prev.filter((game) => game.id !== selectedGame.id))
      setTimeout(setIsModalOpen(false), "1500")
      if (gameData.length === 1) { // due to lag of "setGameData", array length will read as 1 when we are emptying it
        setReset(!reset)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemoveFromCart = async () => {
    try {
      await removeFromCart(user._id, selectedGame._id)
      setCart((prev) => prev.filter((product) => product._id !== selectedGame._id))
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handlePurchase = async () => {
    try {
      await purchase(user._id, selectedGame)
      await removeFromCart(user._id, selectedGame._id)
      setCart((prev) => prev.filter((product) => product._id !== selectedGame._id))
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddReview = async (reviewFormData) => {
    await createReview(selectedGame._id, reviewFormData.text)
    // setReview(reviewFormData)
    // console.log(review)
    // console.log('reviewFormData', reviewFormData)
    // console.log('rev data txt', reviewFormData.text)
    // console.log(selectedGame._id)
  }

  // may need to be passed into Review Form and rendered conditionally
  const handleEditReview = async (reviewFormData) => {
    //    await updateReview(?????, ????? , reviewFormData)
    setReview(reviewFormData)
  }

  const handleDeleteReview = async () => {
    //    await deleteReview(????, ????)
    setReview('')
  }

  const handleRemoveFromLibrary = async () => {
    try {
      await removeFromLibrary(user._id, selectedGame._id)
      console.log(selectedGame._id)
      setLibrary((prev) => prev.filter((product) => product._id !== selectedGame._id))
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
    }
  }
  // dynamically render icon
  let currentMedia = ""
  for (const key of Object.keys(media)) {
    if (key === `../../assets/${selectedGame.media}.png`) {
      currentMedia = `/src/assets/${selectedGame.media}.png`
      break
    }
  }

  // return
  return (
    <div className="modal-overlay" >
      <div className="card-details-modal">
        <div>
          <div className="card-modal-header">
            <img className="card-modal-icon" src={currentMedia} alt={selectedGame.media} />
            <h2>{selectedGame.title} {selectedGame.releaseDate ? `(${selectedGame.releaseDate.slice(0, 4)})` : null}</h2>
            <button onClick={onClose} className='card-modal-close-btn'>X</button>
          </div>
          <img src={selectedGame.cover} alt="Cover art" className="card-modal-cover" />
          {location.pathname === '/library'
            ?
            <div className='card-modal-review-section'>
              {!review
                ?
                <ReviewForm handleAddReview={handleAddReview} setIsModalOpen={setIsModalOpen} />
                :
                <div>
                  <p>{review.author}</p>
                  <p>{review.text}</p>
                  <div className='card-modal-review-btn modal-btns'>
                    <button onClick={() => handleEditReview()} className='edit-review-btn'>Edit Review</button>
                    <button onClick={() => handleDeleteReview()} className='delete-review-btn'>Delete Review</button>
                  </div>
                </div>
              }
              <div className='card-modal-review-form'>
              </div>
            </div>
            : null
          }

          <div className='card-modal-info'>
            <div className='ratings-price'>
              <div className="info-item">
                <h3>Parental Rating:</h3>
                <p className='rating'>{selectedGame.parentalRating}</p>
              </div>
              {selectedGame.totalRating
                ? (
                  <div className="info-item">
                    <h3>Total Rating:</h3>
                    <p className='rating'>{selectedGame.totalRating / 10}/10</p>
                  </div>
                )
                : null}
              {location.pathname !== '/library'
                ?
                <div className="info-item">
                  <h3>Price:</h3>
                  <p className='price'>${selectedGame.price}</p>
                </div>
                : null
              }
            </div>
          </div>
          {selectedGame.summary
            ? <div className="info-item">
              <h3>Summary:</h3>
              <p>{selectedGame.summary}</p>
            </div>
            : selectedGame.storyline
              ? <div className="info-item">
                <h3>Summary:</h3>
                <p>{selectedGame.storyline}</p>
              </div>
              : null
          }
          {selectedGame.genres.length > 0
            ? <div className="info-item">
              <h3>Genres:</h3>
              <p>{selectedGame.genres.map(genre => genre.name).join(', ')}</p>
            </div>
            : null
          }
        </div>
        {
          location.pathname === "/library"
            ? <div className="modal-btns">
              <button className="library-remove-btn" onClick={() => handleRemoveFromLibrary()}>Remove from Library</button>
            </div>

            : location.pathname === "/cart"
              ? <div className="modal-btns">
                <button className="remove-btn" onClick={() => handleRemoveFromCart()}>Remove from Cart</button>
                <button className="add-to-cart-btn" onClick={() => handlePurchase()}>Purchase</button>
              </div>

              : <div className="modal-btns">
                <button className="remove-btn" onClick={() => handleAddToCart()}>Remove</button>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart('add')}>Add to Cart</button>
              </div>
        }
      </div>
    </div>
  )
}

// export
export default CardDetails