// imports
import { useNavigate } from "react-router"

// component
const Landing = () => {
    // hookds
    const navigate = useNavigate()

    // return
    return (
        <>
            <h1>This the landing page for new users</h1>
            <button onClick={() => navigate('/sign-up')}>Sign Up</button>
            <button onClick={() => navigate('/sign-in')}>Sign In</button>
        </>
    )
}

// export
export default Landing