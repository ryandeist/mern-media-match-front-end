// imports
import { useState } from "react"
import gameGenres from "../../data/gameGenres"

// component
const SettingsComponent = ({ settings, setSettings }) => {

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
    // want to send settings to settings db
    // want to have to save to do that
    // make a save button and add handleSubmit logic

    // return
    return (
        <div>
            <div>
                <h3>Medium</h3>
                <label>
                    Video Games
                    <input 
                      type="checkbox" 
                      name="VideoGames"
                      checked={true}
                      disabled 
                    />

                </label>
            </div>
            <div>
                <h3>Genres</h3>    
                {gameGenres.map((genre) => (
                    <label key={genre.id} htmlFor={genre.name}>
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
    )
}

// export
export default SettingsComponent