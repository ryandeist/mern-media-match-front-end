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

    // state variables
    const [isRegister, setIsRegister] = useState(false)

    // handler functions
    const handleAuth = (selection) => {
        setIsRegister(selection)
    }

    // return
    if (!user) return (
        <div className="registration-card">
            <h3>Welcome to</h3>
            <img className="card-image" src={Logo} alt="cover image" /> 
            { !isRegister 
              ? 
              <>
                <p>Looking for something new or a piece of nostalgia to enjoy?</p>
                <p><strong>Media Match</strong> will bring it to you!</p>
                <button className="sign-up-btn" onClick={() => handleAuth("Sign Up")}> Sign Up </button>
                <button className="sign-in-btn" onClick={() => handleAuth("Sign In")}> Sign In</button>
              </>
              : isRegister === "Sign In"
              ? <>
                  <SignInForm />
                  <button className='back-btn' onClick={() => handleAuth('')}>Back</button>
                </>
              : <>
                  <SignUpForm />
                  <button className='see-more-btn' onClick={() => handleAuth('')}>Back</button>
                </>
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