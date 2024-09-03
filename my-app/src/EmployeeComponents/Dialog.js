import React ,{useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';

export default function Dialogg({weekRange,emp_id,onKPISubmit}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [flag,setFlag]=useState(true);
  const handleSubmit=async()=>{
    handleClose();
    onKPISubmit();
    fetch(`http://localhost:4000/extra/sendForApproval/${emp_id}`
   )
   .then(async(response) => {
     const res=await response.json();
     console.log(res,"sent for approval")
   if (response.ok) {
     setSuccess("Successfully Approved !!!");
   } else {
     setError("Error with server ");
   }
   })
   .catch((error) => {
   setError(error.message);
   });
   
   
   };
  useEffect(()=>{
    if (weekRange?.length > 0 && weekRange.every(range => range.status === 'submitted')) {
        const currentDate = new Date();
        if (currentDate.getDate() > 20) {
          setFlag(false);
        }
      }
  })
  return (
    <React.Fragment>
      <Button variant="contained" disabled={flag} onClick={handleClickOpen}>
      <Typography sx={{fontSize:'13px'}}>Send For <br/> Approval</Typography>
      </Button>
      <Dialog   
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          Submit Your Request ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          Do you want to submit your request for approval? This will send your request to the approver for review.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            No
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
