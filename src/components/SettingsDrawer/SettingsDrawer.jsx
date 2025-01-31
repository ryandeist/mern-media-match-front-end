import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import SettingsComponent from "../SettingsComponent/SettingsComponent";

const SettingsDrawer = ({ isDrawerOpen, setIsDrawerOpen, settings, setSettings }) => {
    return (
      <Drawer
        anchor='left'
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
          <Box 
            p={2}
            width='250px'
            textAlign='center'
            role='presentation'
          >
            <Typography variant='h6' component='div'>
                Side Panel
                <SettingsComponent settings={settings} setSettings={setSettings}/>
            </Typography>
          </Box>
      </Drawer>
    )
}


export default SettingsDrawer 

// <Drawer 
// anchor='left' 
// open={isDrawerOpen} 
// onClose={() => setIsDrawerOpen(false)}
// >
//   <Box p={2} width="250px" textAlign={center} role='presentation'>
//       <Typography variant='h6' component='div'> 
//           Side Panel
//           <SettingsComponent />
//       </Typography>
//   </Box>
// </Drawer>