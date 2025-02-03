// imports
import './CardDetails.css'
import { addToCart, removeFromCart } from '../../services/cartService'
import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/UserContext"
import { useLocation } from 'react-router'
import ReviewForm from '../ReviewForm/ReviewForm'

const media = import.meta.glob('../../assets/*.png')

const CardDetails = ({ gameData, selectedGame, onClose, setGameData, setIsModalOpen, setReset, reset, productsList, setProductsList }) => {
  // hooks
  const { user } = useContext(UserContext)
  const location = useLocation()

  if (!selectedGame) return setIsModalOpen(false)

  // state variables
  const [review, setReview] = useState(false)

  // use effect 
  useEffect(() => {
    if (location.pathname === '/library') {
      const fetchReview = async() => {
        try {
          // pull review from db, if there is one, set Review.
          console.log('Prof Plum in Library with Banana')
        } catch (err) {
          console.log('Error fetching review', err)
        }
      }
      fetchReview()
    }
  }, [])
  
  // dynamically render icon
  let currentMedia = ""
  for (const key of Object.keys(media)) {
    if (key === `../../assets/${selectedGame.media}.png`) {
      currentMedia = `/src/assets/${selectedGame.media}.png`
      break
    }
  }

  // handler functions
  const handleRemoveFromCart = async (buttonName) => {
    try {
      if (buttonName === 'remove') await removeFromCart(user._id, selectedGame._id)
      setProductsList((prev) => prev.filter((product) => product._id !== selectedGame._id))
      setIsModalOpen(false)
    } catch (err) {
      console.log(err)
    }
  }

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

  // return
  return (
    <div className="modal-overlay">
      <div className="card-details-modal">
        <div>
          <div className="card-modal-header">
            <img className="card-modal-icon" src={currentMedia} alt={selectedGame.media} />
            <h2>{selectedGame.title} {selectedGame.releaseDate ? `(${selectedGame.releaseDate.slice(0, 4)})` : null}</h2>
            <button onClick={onClose} className='card-modal-close-btn'>X</button>
          </div>
          <img src={selectedGame.cover} alt="Cover art" className="card-modal-cover" />
          { location.pathname === '/cart' 
            ? 
              <div className='card-modal-review-section'>
                {!review
                  ?  
                    <ReviewForm setReview={setReview} />
                  : 
                     <div className='card-modal-review-btn modal-btns'>
                       <button className='edit-review-btn'>Edit Review</button>
                       <button className='delete-review-btn'>Delete Review</button>
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
              <div className="info-item">
                <h3>Price:</h3>
                <p className='price'>${selectedGame.price}</p>
              </div>
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
          {/* {selectedGame.genres.length > 0
              ? <div className="info-item">
                <h3>Genres:</h3>
                <p>{selectedGame.genres.map(genre => genre.name).join(', ')}</p>
              </div>
              : null
            } */}
        </div>
        {
          location.pathname === "/library"
            ? <div className="modal-btns">
              <button className="library-remove-btn" >Remove from Library</button>
            </div>

            : location.pathname === "/cart"
              ? <div className="modal-btns">
                <button className="remove-btn" onClick={() => handleRemoveFromCart('remove')}>Remove from Cart</button>
                <button className="add-to-cart-btn">Purchase</button>
              </div>

              : <div className="modal-btns">
                <button className="remove-btn" onClick={() => handleAddToCart('remove')}>Remove</button>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart('add')}>Add to Cart</button>
              </div>
        }
      </div>
    </div>
  )
}

// export
export default CardDetails