import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { logo } from "./Constant";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user=window.localStorage.getItem("username")
  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate =useNavigate() ;
  const handleLogout = () => {
    
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    localStorage.removeItem("username");
    localStorage.removeItem("user");
    localStorage.removeItem("userProfile");
    setAuth(false);
    navigate("/login", { replace: true }); 
  };
  const userData=JSON.parse(window.localStorage.getItem("userData"))
 
  return (
    <AppBar  sx={{ height: '45px', bgcolor: "#240750",position:'Sticky' }}>
      <Toolbar >
        <IconButton edge="start" color="inherit" aria-label="logo" sx={{ mr: 2 ,mb:2}}>
          {logo}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {/* Add a spacer to push the username and avatar to the right */}
          <Box sx={{ flexGrow: 1 }} />
        </Typography>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="inherit"
          sx={{mb:2}}
        >
          <AccountCircle />
        </IconButton>
        <Typography variant="body1" component="div" sx={{ mr: 2 ,mb:2}}>
          {userData?.f_name}
        </Typography>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;