import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PreviewTable from "./PreviewTable";

export default function MaxWidthDialog() {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState(100);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentMonth = months[new Date().getMonth()];
  
  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} sx={{ml:'10px',mt:'10px',mb:'20px'}}>
        Preview
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>KPI Preview</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {currentMonth} 2024
          </DialogContentText>
          <PreviewTable />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
