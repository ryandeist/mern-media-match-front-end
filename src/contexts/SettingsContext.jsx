// imports
import { createContext, useState } from "react"

// hooks
const SettingsContext = createContext()

// context
const SettingsProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [isSettings, setIsSettings] = useState(true)
    const [settings, setSettings] = useState({
        media: [],
        genre: [],
    })

    const value = { isDrawerOpen, setIsDrawerOpen, isSettings, setIsSettings, settings, setSettings }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

// export
export { SettingsProvider, SettingsContext }