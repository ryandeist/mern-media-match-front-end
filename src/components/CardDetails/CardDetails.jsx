// imports
import './CardDetails.css'
import VideoGames from '../../assets/Video_Games.png'

const CardDetails = ({ gameData, onClose}) => {
    if (!gameData) return null
    
    let media = gameData.media.split(" ").join("")
    console.log("media", media)
    return (
        <div className="modal-overlay">
            <div className="card-details-modal">
                <div className="card-modal-header">
                  <img src={media} alt="" /> 
                  <h2>{gameData.title} {gameData.releaseDate ? `(${gameData.releaseDate.slice(0,4)})` : null}</h2>
                  <button onClick={onClose}>X</button>
                </div>
                
                <img src={gameData.cover} alt="Cover art" className="card-modal-cover"/>
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
                          <p className='rating'>{gameData.totalRating/10}/10</p>
                        </div>
                      )
                    : null}
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
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default CardDetails;
