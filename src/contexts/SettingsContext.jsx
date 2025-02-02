// imports
import { createContext, useState } from "react"

// hooks
const SettingsContext = createContext()

// context
const SettingsProvider = ({ children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)

    const value = { isDrawerOpen, setIsDrawerOpen }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}

// export
export { SettingsProvider, SettingsContext }