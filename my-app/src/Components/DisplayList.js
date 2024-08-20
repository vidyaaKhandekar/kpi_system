import React, { useState,useEffect } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
  Snackbar,Alert
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DisplayList = ({ listItem, fetchData, url, deptId }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const deleteListItem = async (Id) => {
    const response = await fetch(`${url}/${Id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: window.localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          setSuccess(" Deleted Successfully");
        
        } else {
          setError("Error in Deleting ");
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleDelete = async (itemId) => {
    await deleteListItem(itemId);
    deptId ? fetchData(deptId) : fetchData();
  };
  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(null); // or setSuccess(false) depending on your state
      }, 2000);
    }
  }, [success]);
  return (
    <Paper
      sx={{
        width: "60%",
        justifyContent: "center",
        alignItem: "center",
        paddingTop: "15px",
      }}
    >
      {success && (
        <Alert
          severity="success"
          duration={2000} 
          position={{
            top: 16,
            right: 16,
          }}
        >
          {success}
        </Alert>
      )}
      <List
        sx={{
          width: "100%",
          maxWidth: 750,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          maxHeight: 400,
        }}
      >
        {listItem?.map((item, index) => (
          <ListItem key={item.id}>
            <ListItemText primary={item.name} />
            <IconButton onClick={() => handleDelete(item.id)}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
            </IconButton>
          </ListItem>
        ))}
      </List>
      
    </Paper>
  );
};

export default DisplayList;
