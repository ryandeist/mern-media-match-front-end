// import
import './CardComponent.css'
import { useLocation } from 'react-router'

// component
const CardComponent = ({ gameData, onCardClick }) => {

    // hooks
    const location = useLocation()
    // source of truth
    let card

    if (location.pathname === '/cart' || location.pathname === '/library') {
        card = gameData
    } else {
        card = gameData[0]
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
            <img className="card-image" src={card?.cover} alt="cover image" />
            <button className="see-more-btn" onClick={handleClick}>See More</button>
        </div>
    )
}

// export
export default CardComponent