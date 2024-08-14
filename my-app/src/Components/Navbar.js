import {
  AppBar,
  styled,
  Toolbar,
  Typography,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import TekdiLogo from "./TekdiLogo.png";

import PersonIcon from "@mui/icons-material/Person";

const Navbar = () => {
  const StyleToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });
  const Person = styled("div")({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  });
  const [open, setOpen] = useState(false);

  return (
    <AppBar
      bgcolor="#987D9A"
      position="sticky"
      sx={{
        bgcolor: "white",
        height: {
          xs: "75px",
          sm: "80px",
        },
        width: "100%",
        p: "12px",
        boxShadow: "none",
        borderBottom: "1px solid grey",
      }}
    >
      <StyleToolbar>
        <Typography
          variant="h6"
          alignContent="centre"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          <img src={TekdiLogo} height={78} width={90} alt="Tekdi LOGO" />
        </Typography>
        <Typography
          variant="h6"
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        >
          <img src={TekdiLogo} height={60} width={65} alt="Tekdi LOGO" />
        </Typography>
        <Person>
          <Typography
            variant="h4"
            sx={{
              color: "black",
              m: "10px",
              fontSize: "15px",
              display: {
                xs: "none",
                sm: "block",
              },
            }}
          >
            User Name
          </Typography>
          <Avatar onClick={(e) => setOpen(true)} sx={{ bgcolor: "#478CCF" }}>
            <PersonIcon />
          </Avatar>
        </Person>
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            marginTop: "50px",
          }}
        >
          <MenuItem onClick={(e) => setOpen(false)}>Profile</MenuItem>
          <MenuItem onClick={(e) => setOpen(false)}>My account</MenuItem>
          <MenuItem onClick={(e) => setOpen(false)}>Logout</MenuItem>
        </Menu>
      </StyleToolbar>
    </AppBar>
  );
};
export default Navbar;
