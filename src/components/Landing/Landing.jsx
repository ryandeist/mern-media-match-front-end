// imports
import { useNavigate } from "react-router"
import styles from './Landing.module.css'
import CardComponent from "../CardComponent/CardComponent"

// component
const Landing = () => {
    // hooks
    const navigate = useNavigate()

    // return
    return (
        <>
            <main className={styles.containter}>
                <div className="card-container">
                    <CardComponent />
                </div>
                <section className={styles.about}>
                    <header>
                        <h1>Welcome to Media Match!</h1>
                        <h2>A place to find your next obsession</h2>
                    </header>
                    <article>
                        <p>
                            Looking for something new or a piece of nostalgia to enjoy? <br/><strong>Media Match</strong> will bring it to you!
                        </p>
                        <p>
                            With the limit on our cart, items won't linger, or ghost away. <br/>You decide when to move them to your library <br/>or let them return to you another day!
                        </p>
                    </article>
                    <h3>
                        Get Started Today!
                        <button onClick={() => navigate('/sign-up')}>Sign Up</button>
                        <button onClick={() => navigate('/sign-in')}>Sign In</button>
                    </h3>
                </section>
            </main>
        </>
    )
}

// export
export default Landing