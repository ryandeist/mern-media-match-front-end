// imports
import './ProductList.css'
import { useEffect, useState, useContext } from 'react'
import { useLocation } from "react-router"
import CardComponent from "../CardComponent/CardComponent"
import CardDetails from "../CardDetails/CardDetails"
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer'
import { getUserCart } from '../../services/cartService'
import { getUserLibrary } from '../../services/libraryService'
import { UserContext } from '../../contexts/UserContext'


// component
const ProductList = ({ setIsModalOpen, isModalOpen, onCardClick, onClose, selectedGame }) => {
    // state
    const [cart, setCart] = useState([])
    const [library, setLibrary] = useState([])

    // hooks
    const location = useLocation()
    const { user } = useContext(UserContext)
    
    let productsList = []

    // useEffect
    useEffect(() => {
        if (location.pathname === '/cart') {
        const fetchCart = async () => {
            try {
                const cartData = await getUserCart(user._id)
                setCart(cartData.cart)
            } catch (err) {
                console.log('Error Fetching Cart', err)
            }
        }
        fetchCart()
    } else if (location.pathname === '/library') {
        const fetchLibrary = async () => {
            try {
                const libraryData = await getUserLibrary(user._id)
                if (!libraryData) setLibrary([])
                setLibrary(libraryData)
            } catch (err) {
                console.log('Error Fetching Cart', err)
            }
        }
        fetchLibrary()
    }
    }, [location, user._id])

    if (location.pathname === '/cart') {
        productsList = cart
    } 
    if (location.pathname === '/library') {
        productsList = library
    }

    // return
    if (productsList.length === 0) return <h1>Your {location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)} is Empty</h1>
    return (
        <>
            <h1>Your {location.pathname.slice(1).charAt(0).toUpperCase() + location.pathname.slice(2)}</h1>
            <div className="product-list">
                {productsList.map((product) => (
                    <CardComponent gameData={product} key={product.id} onCardClick={onCardClick} selectedGame={product} className="product-list-card" />
                ))}
            </div>
            {isModalOpen && <CardDetails
                onClose={onClose}
                selectedGame={selectedGame}
                setCart={setCart}
                setLibrary={setLibrary}
                setIsModalOpen={setIsModalOpen}
            />}
            <SettingsDrawer />
        </>
    )
}

// export
export default ProductList