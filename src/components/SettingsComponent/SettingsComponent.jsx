// imports
import './SettingsComponent.css'
import { useContext, useState } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { SettingsContext } from '../../contexts/SettingsContext'
import { createSettings, updateSettings } from "../../services/settingsService"
import gameGenres from "../../data/gameGenres"

// component
const SettingsComponent = ({ settings, setSettings }) => {
    // hooks
    const { user } = useContext(UserContext)
    const { setIsDrawerOpen, isSettings, setIsSettings } = useContext(SettingsContext)
    const navigate = useNavigate()

    // state variables
    const [newSettings, setNewSettings] = useState(settings)

    //handler functions
    const handleCheckboxChange = async (evt) => {
        await setNewSettings((prev) => {
            if (evt.target.name === "media") { // change to media when rendering dynamically
                const selectedMedia = evt.target.value
                const updatedMedia = prev.media.includes(selectedMedia)
                    ? prev.media.filter(media => media !== selectedMedia)
                    : [...prev.media, selectedMedia]

                return {
                    ...prev,
                    media: updatedMedia
                }
            } else {
                const updatedGenres = [...prev.genre]
                if (updatedGenres.includes(evt.target.name)) {
                    return {
                        ...prev,
                        genre: updatedGenres.filter(genre => genre !== evt.target.name),
                    }
                } else {
                    return {
                        ...prev,
                        genre: [...updatedGenres, evt.target.name],
                    }
                }
            }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        if (!isSettings) {
            await createSettings(user._id, newSettings)
            setIsSettings(true)
        } else {
            await updateSettings(user._id, newSettings)
        }
        setSettings(newSettings)
        setIsDrawerOpen(false)
        navigate('/')

    }

    // return
    return (
        <form onSubmit={handleSubmit} className="settings-form">
            <div className="settings-section">
                <h3 className="section-heading">Medium</h3>
                {/* wrap the label with media.map((mediaType) => ))} */}
                <label className="checkbox-label large-checkbox">
                    <input
                        type="checkbox"
                        name="media" // change to "media" when more options incorporated 
                        onChange={handleCheckboxChange}
                        checked={newSettings.media ? newSettings.media.includes("VideoGames") : false} // {settings.media.includes(mediaOption)}
                        value="VideoGames" //change to {mediaType}
                    //   disabled={initSettings.media.length > 0}// will remove when more options available
                    />
                    Video Games {/* mediaOption */}
                </label>
                {/* close media map here */}
            </div>
            <div className="settings-sections">
                <h3 className="section-heading">Genres</h3>
                <div className="checkbox-grid">
                    {gameGenres.map((genre) => (
                        <label key={genre.id} htmlFor={genre.name} className="checkbox-label">
                            <input
                                type="checkbox"
                                name={genre.name}
                                id={genre.id}
                                onChange={handleCheckboxChange}
                                checked={newSettings.genre ? newSettings.genre.includes(genre.name) : false}
                            />
                            {genre.name}
                        </label>
                    ))}
                </div>
            </div>
            <button type="submit" className="save-btn">Save Settings</button>
        </form>
    )
}

// export
export default SettingsComponent