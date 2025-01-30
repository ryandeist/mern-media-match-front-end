// import
import { useState } from "react"

// component
const CardComponent = (props) => {

    const showProp = () => {
        console.log(props)
    }
    // return 
    return (
        <div>
            <img src={props.gameData[0]?.cover} alt="cover image for product"/>
                {props.gameData[0]?.name}
                {props.gameData[0]?.parentalRating}
                ${props.gameData[0]?.price}
        </div>
    )
}

// export
export default CardComponent