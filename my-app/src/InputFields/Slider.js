import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';


export default function DiscreteSlider() {
  return (
    <Box sx={{ width: 300 ,height:50}}>
      <Slider
        aria-label="Temperature"
        defaultValue={2}
        valueLabelDisplay="auto"
        shiftStep={2}
        step={2}
        marks
        min={0}
        max={2}
      />
      <Slider defaultValue={0} step={2} marks min={0} max={2} disabled />
    </Box>
  );
}