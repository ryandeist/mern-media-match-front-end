import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { showGame } from '../../services/apiService'
import { showSettings } from '../../services/settingsService'
import { UserContext } from '../../contexts/UserContext'
import CardComponent from "../CardComponent/CardComponent"
import CardDetails from "../CardDetails/CardDetails"
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer'


const UserHomePage = (props) => {
    // hooks
    const { user } = useContext(UserContext)
    const navigate = useNavigate()

    // state variable
    const [settings, setSettings] = useState({
        media: ["VideoGames"],
        genre: [],
    })
    const [gameData, setGameData] = useState([])    
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedGame, setSelectedGame] = useState(null)



    useEffect(() => {
        if (user) { navigate(`/users/${user._id}`) }
    
        const fetchSettings = async () => {
          const fetchedSettings = await showSettings(user._id)
          console.log('Fetched Settings:', fetchedSettings)

          try {
            if (fetchedSettings && fetchedSettings.settings && fetchedSettings.settings.length > 0) {
                const fetchedMedia = fetchedSettings.settings[0].media || []
                const fetchedGenres = fetchedSettings.settings[0].genre || []
                console.log(fetchedGenres)
                setSettings({
                    media: fetchedMedia,
                    genre: fetchedGenres,
                })
            } else {
                setSettings({
                    media: ["VideoGames"],
                    genre: []
                });
            }
          } catch (err) {
            console.log('Error fetching settings:', err)
          }
        }

        if (user) { fetchSettings() }
      }, [user])
    
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const fetchedData = await showGame(settings.genre)
            setGameData(fetchedData)
            console.log('un', settings)
            
          } catch (err) {
            console.log('Error fetching card data:', err)
          }
        }
        fetchData()
      }, [settings])

    // fetch function
    const fetchData = async () => {
        const fetchedData = await showGame(settings.genre)
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