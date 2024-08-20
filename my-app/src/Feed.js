import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
const Feed = () => {
  return (
   <Box bgcolor="grey" flex={9}>
        <Outlet/>
   </Box>
  )
}

export default Feed
