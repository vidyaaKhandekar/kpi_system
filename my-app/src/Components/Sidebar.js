import {
  Box,
  List,
  ListItemIcon,
  ListItemButton,
  ListItem,
  styled,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ list }) => {
  const [selectedItem, setSelectedItem] = useState("employee");

  const StyledListItem = styled(ListItem)({
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    height: "70px",
    flexDirection: "column",
  });

  const StyledListItemButton = styled(ListItemButton)({
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    "&.Mui-selected": {
      width: "25px",
      height: "45px",
      p: 0, // Change background color on selection
    },
  });

  return (
    <Box
      p={0}
      m={0}
      sx={{
        color: "white",
        display: { xs: "none", sm: "none", md: "block" },
        height: "100vh",
        width: "75px",
        zIndex: "1",
      }}
    >
      <Box
        position="fixed"
        bgcolor="primary.main"
        p={0}
        m={0}
        sx={{
          color: "white",
          display: { xs: "none", sm: "none", md: "block" },
          height: "100vh",
          width: "75px",
          zIndex: "1",
        }}
      >
        <List>
          {list.map((item, index) => (
            <StyledListItem key={index}>
              <StyledListItemButton
                component={Link}
                to={item.text}
                sx={{
                  justifyContent: "center",
                  "& .MuiListItemIcon-root": {
                    width: "19px",
                    height: "38px",
                    p: 0,
                  },
                  "& .MuiListItemIcon-root.Mui-selected": {
                    width: "25px",
                    height: "45px",
                    p: 0,
                  },
                }}
                onClick={() => setSelectedItem(item.text)}
                selected={selectedItem === item.text} // Set selected state based on state variable
                // Update state variable on click
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    "& .MuiTypography-root": {
                      fontSize: "12px",
                      p: 0,
                    },
                    textAlign: "center",
                  }}
                />
              </StyledListItemButton>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
