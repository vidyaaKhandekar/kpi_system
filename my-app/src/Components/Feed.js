import { Stack } from '@mui/material';
import React from 'react'
import Department from './Department';


const Feed = () => {
  return (
   <Stack bgcolor={'#FDF4F5'} flex={8} sx={{alignItems:"centre"}}>
      <Department/>
   </Stack>
  )
}
export default Feed;
