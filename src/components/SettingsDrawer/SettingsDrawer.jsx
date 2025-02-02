// import
import { Drawer, Box, Typography,  } from "@mui/material"
import { useContext } from "react"
import { useNavigate } from "react-router"
import SettingsComponent from "../SettingsComponent/SettingsComponent"
import { SettingsContext } from "../../contexts/SettingsContext"

// component
const SettingsDrawer = ({ settings, setSettings }) => {
    // hooks
    const navigate = useNavigate()
    const { isDrawerOpen, setIsDrawerOpen } = useContext(SettingsContext)

    // handler functions
    const handleCloseDrawer = () => {
      setIsDrawerOpen(false)
      navigate('/')
    }

    // return
    return (
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => handleCloseDrawer()}
      >
          <Box 
            p={2}
            width='250px'
            textAlign='center'
            role='presentation'
          >
            <Typography variant='h6' component='div'>
                Settings
                <SettingsComponent settings={settings} setSettings={setSettings} />
            </Typography>
          </Box>
      </Drawer>
    )
}

// export
export default SettingsDrawer 
