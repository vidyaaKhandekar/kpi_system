import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const DisplayList = ({ listItem, fetchData, url, deptId }) => {
  const deleteListItem = async (Id) => {
    try {
      const response = await fetch(`${url}/${Id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error deleting department');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleDelete = async (itemId) => {
    await deleteListItem(itemId);
    deptId ? fetchData(deptId) : fetchData();
  };

  return (
    <Paper
      sx={{
        width: "60%",
        justifyContent: "center",
        alignSelf: "center",
        paddingTop: "50px",
      }}
    >
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