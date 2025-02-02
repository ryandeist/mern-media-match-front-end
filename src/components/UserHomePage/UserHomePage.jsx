// imports
import { useContext, useState, useEffect } from 'react'
import { showGame } from '../../services/apiService'
import { UserContext } from '../../contexts/UserContext'
import { showSettings } from '../../services/settingsService'
import CardComponent from "../CardComponent/CardComponent"
import CardDetails from "../CardDetails/CardDetails"
import SettingsDrawer from '../SettingsDrawer/SettingsDrawer'


// component
const UserHomePage = ({ handleCardClick, handleCloseModal, isDrawerOpen, setIsDrawerOpen, isModalOpen, setIsModalOpen, selectedGame }) => {
    // hooks
    const { user } = useContext(UserContext)

    // state variable
    const [settings, setSettings] = useState({
        media: [],
        genre: [],
    })
    const [gameData, setGameData] = useState([])
    const [isSettings, setIsSettings] = useState(false)
    const [reset, setReset] = useState(false)

    // use effects
    useEffect(() => {
        // if (user) { navigate(`/users/${user._id}`) }
    
        const fetchSettings = async () => {
          const fetchedSettings = await showSettings(user._id)

          try {
            if (fetchedSettings && fetchedSettings.settings && fetchedSettings.settings.length > 0) {
                const fetchedMedia = fetchedSettings.settings[0].media || []
                const fetchedGenres = fetchedSettings.settings[0].genre || []
                setSettings({
                    media: fetchedMedia,
                    genre: fetchedGenres,
                })
                setIsSettings(true)
            } else {
                setSettings({
                    media: [],
                    genre: [],
                })
                setIsSettings(false)
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
          } catch (err) {
            console.log('Error fetching card data:', err)
          }
        }
        fetchData()
      }, [settings, reset])

    // prevent background scrolling
    if (isModalOpen) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    // return
    return (
        <>
            <div className="card-container">
                <CardComponent gameData={gameData} onCardClick={handleCardClick} />
            </div>
            {isModalOpen && (<CardDetails
              gameData={gameData} 
              setGameData={setGameData}
              setIsModalOpen={setIsModalOpen} 
              onClose={handleCloseModal} 
              reset={reset}
              setReset={setReset}   
              selectedGame={selectedGame} 
            />)}
            <SettingsDrawer
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
                isSettings={isSettings}
                setIsSettings={setIsSettings}
                settings={settings}
                setSettings={setSettings}
            />
        </>
    )
}

// export
export default UserHomePage