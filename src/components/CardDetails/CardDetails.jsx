// imports
import './CardDetails.css'
import { addToCart } from '../../services/cartService'
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"
const media = import.meta.glob('../../assets/*.png')

const CardDetails = ({ gameData, onClose, setGameData, setIsModalOpen }) => {
  const { user } = useContext(UserContext)

  if (!gameData) return null

  // dynamically render icon
  let currentMedia = ""
  for (const key of Object.keys(media)) {
    if (key === `../../assets/${gameData.media}.png`) {
      currentMedia = `/src/assets/${gameData.media}.png`
      break
    }
  }
  const handleAddToCart = async (e) => {
    e.preventDefault()
    try {
      const newCartItem = await addToCart(user._id, gameData)
      console.log(newCartItem)
      setGameData((prev) => prev.filter((game) => game.id !== gameData.id))
      setTimeout(setIsModalOpen(false), "0500")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form onSubmit={handleAddToCart}>
      <div className="modal-overlay">
        <div className="card-details-modal">
          <div>
            <div className="card-modal-header">
              <img className="card-modal-icon" src={currentMedia} alt={gameData.media} />
              <h2>{gameData.title} {gameData.releaseDate ? `(${gameData.releaseDate.slice(0, 4)})` : null}</h2>
              <button onClick={onClose}>X</button>
            </div>
            <img src={gameData.cover} alt="Cover art" className="card-modal-cover" />
            <div className='card-modal-info'>
              <div className='ratings-price'>
                <div className="info-item">
                  <h3>Parental Rating:</h3>
                  <p className='rating'>{gameData.parentalRating}</p>
                </div>
                {gameData.totalRating
                  ? (
                    <div className="info-item">
                      <h3>Total Rating:</h3>
                      <p className='rating'>{gameData.totalRating / 10}/10</p>
                    </div>
                  )
                  : null}
                <div className="info-item">
                  <h3>Price:</h3>
                  <p className='price'>${gameData.price}</p>
                </div>
              </div>

              <div className="info-item">
                <h3>Price:</h3>
                <p className='price'>${gameData.price}</p>
              </div>
            </div>
            {gameData.summary
              ? <div className="info-item">
                <h3>Summary:</h3>
                <p>{gameData.summary}</p>
              </div>
              : gameData.storyline
                ? <div className="info-item">
                  <h3>Summary:</h3>
                  <p>{gameData.storyline}</p>
                </div>
                : null
            }
            {gameData.genres.length > 0
              ? <div className="info-item">
                <h3>Genres:</h3>
                <p>{gameData.genres.map(genre => genre.name).join(', ')}</p>
              </div>
              : null
            }
          </div>
          <div className="modal-buttons">
            <button className="remove-btn">Remove</button>
            <button className="add-to-cart-btn" type='submit' onClick={() => console.log(gameData)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default CardDetails;
