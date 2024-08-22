import {
  Box,
  List,
  ListItemIcon,
  ListItemButton,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";
import { AdminList } from "./Constant";
import { Link } from "react-router-dom";
const Sidebar = ({ list }) => {
  const StyledListItem = styled(ListItem)({
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
    height: "70px",
  });
  console.log(list);
  return (

    <Box
    
      bgcolor="#240750"
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
     <Box position='fixed' bgcolor="#240750"
      p={0}
      m={0}sx={{
        color: "white",
        display: { xs: "none", sm: "none", md: "block" },
        height: "100vh",
        width: "75px",
        zIndex: "1",
      }}  >
      
        <List>
          {list.map((item, index) => (
            <StyledListItem key={index}>
              <ListItemButton
                component={Link}
                to={item.text}
                sx={{ justifyContent: "center" }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                {/* <ListItemText primary={item.text} /> */}
              </ListItemButton>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};
export default Sidebar;
