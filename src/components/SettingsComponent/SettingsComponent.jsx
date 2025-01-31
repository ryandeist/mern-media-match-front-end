// imports
import { useParams } from "react-router"
import { showSettings } from "../../services/settingsService"
import gameGenres from "../../data/gameGenres"
import './SettingsComponent.css'

// component
const SettingsComponent = ({ settings, setSettings }) => {
    const { userId } = useParams()
    //handler functions
    const handleCheckboxChange = async (evt) => {
        await setSettings((prev) => {
            if (prev.includes(evt.target.name)) {
                return prev.filter(genre => genre !== evt.target.name)
            } else {
                return [...prev, evt.target.name]
            }
        })
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault()
        const savedSettings = await showSettings(userId)
        console.log(savedSettings)

    }
    // want to send settings to settings db
    // want to have to save to do that
    // make a save button and add handleSubmit logic

    // return
    return (
        <form onSubmit={handleSubmit} className="settings-form">
            <div className="settings-section">
                <h3 className="section-heading">Medium</h3>
                <label className="checkbox-label large-checkbox">
                    <input 
                      type="checkbox" 
                      name="VideoGames"
                      checked={true}
                      disabled 
                    />
                    Video Games
                </label>
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
                              checked={settings.includes(genre.name)}
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