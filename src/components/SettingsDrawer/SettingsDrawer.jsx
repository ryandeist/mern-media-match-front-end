// import
import { Drawer, Box, Typography,  } from "@mui/material"
import { useNavigate } from "react-router"
import SettingsComponent from "../SettingsComponent/SettingsComponent"

// component
const SettingsDrawer = ({ isDrawerOpen, setIsDrawerOpen, settings, setSettings, isSettings, setIsSettings }) => {
    // hooks
    const navigate = useNavigate()

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
                <SettingsComponent settings={settings} setSettings={setSettings} isSettings={isSettings} setIsSettings={setIsSettings} setIsDrawerOpen={setIsDrawerOpen} />
            </Typography>
          </Box>
      </Drawer>
    )
}

// export
export default SettingsDrawer 
