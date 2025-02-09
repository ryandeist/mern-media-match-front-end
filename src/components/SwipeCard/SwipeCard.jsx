// imports 
import { motion, useMotionValue } from 'framer-motion'
import CardComponent from '../CardComponent/CardComponent'

// components
const SwipeCard = ({ gameData, onAddToCart, onCardClick }) => {
    // hooks
    const x = useMotionValue(0)

    // handler functions 
    const handleDragEnd = () => {
        if (Math.abs(x.get()) > 50 ) {
            const selectedGame = gameData[0]
            const direction = x.get() > 0 ? 'add' : ''
            onAddToCart(direction, selectedGame)
        }
    }

    // return
    return (
        <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x }}
            onDragEnd={handleDragEnd}
        >
            {gameData.length > 0 && (
                <CardComponent
                    gameData={gameData}
                    onCardClick={onCardClick}
                />
            )}
        </motion.div>
    )
}

// export
export default SwipeCard