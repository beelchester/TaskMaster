import { useState } from 'react'
import LeftDrawer from './components/LeftDrawer'
import Today from './components/Today'
import Upcoming from './components/Upcoming'
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';

function App() {
  const page = useSelector((state: any) => state.currentPage);
  console.log(page)
  return (
    <Box sx={{display:'flex'}}>
      <LeftDrawer/>
      {page === 'Today' ? <Today/> : <Upcoming/>
      }
    </Box>
  )
}
export default App
