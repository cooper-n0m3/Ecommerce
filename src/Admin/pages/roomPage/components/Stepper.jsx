import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [1,2,3,4,5,6,7,8];
export default function StepperCompleted({completed}) {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={completed} alternativeLabel>
        {
        steps.map((label,index) => (
          <Step key={index}>
            <StepLabel>
            </StepLabel>
          </Step>
        ))
        }
      </Stepper>
    </Box>
  );
}