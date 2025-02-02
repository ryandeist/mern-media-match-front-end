// import
import './CardComponent.css'
import { useLocation } from 'react-router'

// component
const CardComponent = ({ gameData, onCardClick }) => {
    
    // hooks
    const location = useLocation()
  
    // source of truth
    if (location.pathname === '/cart' || location.pathname === '/library' ) {
        let card = gameData
    } else {
        let card = gameData[0]
    }
  
    // handler functions
    const handleClick = () => {
        onCardClick(card)
    }
    
    // return 
    if (!card) return <div>Loading...</div>
    return (
        <div className="card">
            <h3>{card?.title || "Untitled"}</h3>
            <img className="card-image" src={card?.cover} alt="cover image"/>
            {/* <div className="card-info">
                <p className="rating">{card.parentalRating}</p>
                <p className="price">${card.price}</p>                
            </div> */}
            <button className="see-more-btn" onClick={handleClick}>See More</button>
        </div>
    )
}

// export
export default CardComponent