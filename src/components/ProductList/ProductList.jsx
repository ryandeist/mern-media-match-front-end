// imports
import './ProductList.css'
import { useLocation } from "react-router"
import CardComponent from "../CardComponent/CardComponent"
import CardDetails from "../CardDetails/CardDetails"
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer'

// component
const ProductList = ({ setIsModalOpen, isModalOpen, onCardClick, onClose, productsList, setProductsList, selectedGame }) => {
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
    if (!productsList) return <div>Loading...</div>
    return (
        <>
            <h1>This is the {location.pathname} route</h1>
            <div className="product-list">
                {productsList.map((product) => (
                    <CardComponent gameData={product} key={product.id} onCardClick={onCardClick} selectedGame={product} className="product-list-card" />
                ))}
            </div>
            <button onClick={handleClick}>See Card Details</button>
            {isModalOpen && <CardDetails 
                onClose={onClose}
                selectedGame={selectedGame}
                productsList={productsList}
                setProductsList={setProductsList}
                setIsModalOpen={setIsModalOpen}
            />}
            <SettingsDrawer />
        </>
    )
}

// export
export default ProductList