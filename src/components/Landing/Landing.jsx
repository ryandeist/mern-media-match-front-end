// imports
import { useNavigate } from "react-router"
import styles from './Landing.module.css'

// component
const Landing = () => {
    // hooks
    const navigate = useNavigate()

    // return
    return (
        <>
            <main className={styles.containter}>
                <section className={styles.about}>
                    <header>
                        <h1>Welcome to Media Match!</h1>
                        <h2>A place to find your next obsession</h2>
                    </header>
                    <article>
                        <p>
                            Spontenatity is the spice of life! Finding something new or a piece of nostalgia to enjoy; Media Match will bring it to you.
                        </p>
                        <p>
                            With the limit on our cart, items won't linger, or ghost away and you decide when to move them to your library or let them return to you another day.
                        </p>
                    </article>
                    <h3>
                        <button onClick={() => navigate('/sign-up')}>Sign Up</button>
                        or
                        <button onClick={() => navigate('/sign-in')}>Sign In</button>
                        to get started!
                    </h3>
                </section>
            </main>
        </>
    )
}

// export
export default Landing