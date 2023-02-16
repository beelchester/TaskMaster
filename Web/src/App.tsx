import { useState } from 'react'
import LeftDrawer from './components/LeftDrawer'
import Page from './components/Page'

import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function App() {
  const page = useSelector((state: any) => state.page.currentPage);
  return (
    <Box sx={{display:'flex'}}>
      <LeftDrawer/>
      {/* {page === 'Today' || page === 'Upcoming' ? <Today/> : <Project/>} */}
      <Page/>
      
    </Box>
  )
}
export default App
