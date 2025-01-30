// import
import { useState } from "react"
import './CardComponent.css'
// component
const CardComponent = (props) => {

    const card = props.gameData[0] 
    // return 
    return (
        <div className="card">
            {/* <h3>{card.name} ({card.releaseDate.slice(0,4)})</h3> */}
            <img className="card-image" src={card?.cover} alt="cover image for product"/>
            {/* <div className="card-info">
                <p className="rating">{card.parentalRating}</p>
                <p className="price">${card.price}</p>                
            </div> */}
            <button className="see-more-btn">See More</button>
        </div>
    )
}

// export
export default CardComponent