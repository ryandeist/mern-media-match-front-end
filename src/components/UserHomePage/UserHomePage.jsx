import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router'
import { showGame } from '../../services/apiService'
// import { UserContext } from '../../contexts/UserContext'
import CardComponent from "../CardComponent/CardComponent"
import CardDetails from "../CardDetails/CardDetails"
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer'


const UserHomePage = (props) => {
    // hooks
    // const { user } = useContext(UserContext)
    // const navigate = useNavigate();

    // state variable
    const [settings, setSettings] = useState([])
    const [gameData, setGameData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedGame, setSelectedGame] = useState(null)

    useEffect(() => {
        // fetch function
        const fetchData = async () => {
            const fetchedData = await showGame(settings)
            console.log('UseEffect Fetched Data triggered')
            setGameData(fetchedData)
        }
        fetchData()
    }, [settings])

    // fetch function
    const fetchData = async () => {
        const fetchedData = await showGame(settings)
        console.log('Function Fetched Data', fetchedData)
        setGameData(fetchedData)
    }

    // handler functions 
    const handleCardClick = (game) => {
        setSelectedGame(game)
        setIsModalOpen(!isModalOpen)
    }

    const handleCloseModal = () => {
        setIsModalOpen(!isModalOpen)
        setSelectedGame(null)
    }

    // prevent background scrolling
    if (isModalOpen) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }
    return (
        <>
            <div className="card-container">
                <CardComponent gameData={gameData} onCardClick={handleCardClick} />
            </div>
            {isModalOpen && (<CardDetails gameData={selectedGame} onClose={handleCloseModal} isModalOpen={isModalOpen} />)}
            <button onClick={fetchData}>Fetch Data</button>
            <SettingsDrawer
                settings={settings}
                setSettings={setSettings}
                isDrawerOpen={props.isDrawerOpen}
                setIsDrawerOpen={props.setIsDrawerOpen}
            />
        </>
    )
}

export default UserHomePage;