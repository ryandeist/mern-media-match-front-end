// import
import { Drawer, Box, Typography,  } from "@mui/material"
import { useContext } from "react"
import SettingsComponent from "../SettingsComponent/SettingsComponent"
import { SettingsContext } from "../../contexts/SettingsContext"

// component
const SettingsDrawer = () => {
    // hooks
    const { isDrawerOpen, handleSeeSettings } = useContext(SettingsContext)

    // return
    return (
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => handleSeeSettings()}
      >
          <Box 
            p={2}
            width='250px'
            textAlign='center'
            role='presentation'
          >
            <Typography variant='h6' component='div'>
                Settings
                <SettingsComponent />
            </Typography>
          </Box>
      </Drawer>
    )
}

// export
export default SettingsDrawer 
