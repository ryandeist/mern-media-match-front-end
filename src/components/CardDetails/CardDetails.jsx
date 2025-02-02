// imports
import './CardDetails.css'
import { addToCart, removeFromCart } from '../../services/cartService'
import { purchase, removeFromLibrary } from '../../services/libraryService'
import { useContext } from "react"
import { UserContext } from "../../contexts/UserContext"

const media = import.meta.glob('../../assets/*.png')

const CardDetails = ({ setLibrary, setCart, gameData, selectedGame, onClose, setGameData, setIsModalOpen, setReset, reset }) => {
  const { user } = useContext(UserContext)

  if (!selectedGame) return setIsModalOpen(false)

  // dynamically render icon
  let currentMedia = ""
  for (const key of Object.keys(media)) {
    if (key === `../../assets/${selectedGame.media}.png`) {
      currentMedia = `/src/assets/${selectedGame.media}.png`
      break
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

  return (
    <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
      <div className="card-details-modal">
        <div>
          <div className="card-modal-header">
            <img className="card-modal-icon" src={currentMedia} alt={selectedGame.media} />
            <h2>{selectedGame.title} {selectedGame.releaseDate ? `(${selectedGame.releaseDate.slice(0, 4)})` : null}</h2>
            <button onClick={onClose}>X</button>
          </div>
          <img src={selectedGame.cover} alt="Cover art" className="card-modal-cover" />
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
            ? <div className="modal-buttons">
              <button className="remove-btn" onClick={() => handleRemoveFromLibrary()}>Remove from Library</button>
              <button className="add-to-cart-btn">Review</button>
            </div>

            : location.pathname === "/cart"
              ? <div className="modal-buttons">
                <button className="remove-btn" onClick={() => handleRemoveFromCart()}>Remove from Cart</button>
                <button className="add-to-cart-btn" onClick={() => handlePurchase()}>Purchase</button>
              </div>

              : <div className="modal-buttons">
                <button className="remove-btn" onClick={() => handleAddToCart()}>Remove</button>
                <button className="add-to-cart-btn" onClick={() => handleAddToCart('add')}>Add to Cart</button>
              </div>
        }
      </div>
    </div>
  )
}

export default CardDetails;
