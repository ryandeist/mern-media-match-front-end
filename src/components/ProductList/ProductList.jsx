// imports
import { useLocation } from "react-router"
import CardDetails from "../CardDetails/CardDetails"

// component
const ProductList = ({ onCardClick, selectedGame, onClose }) => {
    // hooks
    const location = useLocation()

    // handler functions
    const handleClick = () => {
        onCardClick({
            title: "hi",
            parentalRating: "3",
            genres: ["1", "2"]
        })
    }

    // return
    return (
        <>
            <h1>This is the {location.pathname} route</h1>
            <button onClick={handleClick}>See Card Details</button>
            <CardDetails 
                onClose={onClose}
                selectedGame={selectedGame}
            />
        </>
    )
}

// export
export default ProductList