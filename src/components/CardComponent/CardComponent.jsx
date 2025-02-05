// import
import './CardComponent.css'
import { useLocation } from 'react-router'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useState } from 'react'
import Logo from '../../../public/MediaMatchLogo22.png' 
import SignInForm from '../SignInForm/SignInForm'
import SignUpForm from '../SignUpForm/SignUpForm'

// component
const CardComponent = ({ gameData, onCardClick }) => {

    // hooks
    const location = useLocation()
    const { user } = useContext(UserContext)
    const {isRegister, setIsRegister} = useState(false)


    const handleSignIn = () => {
        setIsRegister(true)
    }

    const handleSignUp = () => {
        setIsRegister(true)
    }

    if (!user) return (
        <div className="card">
            <h3>Welcome to</h3>
            <img className="card-image" src={Logo} alt="cover image" /> 
            { !isRegister 
              ? 
              <>
                <button className="see-more-btn" onClick={() => handleSignUp()}> Sign Up </button>
                <button className="see-more-btn" onClick={() => handleSignIn()}> Sign In</button>
              </>
              : <SignUpForm />
            }
        </div>
    )
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