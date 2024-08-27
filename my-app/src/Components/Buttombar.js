import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";

export default function Buttombar({list}) {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const StyledBottomNavigationAction = styled(BottomNavigationAction)`
    color: white;
    &:hover {
      color: white;
    }
    &.Mui-selected {
      color: white;
    }
  `;
  return (
    <BottomNavigation
      sx={{
        width: "100%",
        display: { sm: "flex", md: "none" },
        position: "sticky",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "primary.main",
      }}
      value={value}
      onChange={handleChange}
    >
      {list.map((item, index) => (
          <StyledBottomNavigationAction
          key={index}
          label={item.label}
          value={item.label}
          component={Link}
          to={item.to}
          icon={item.icon}
        />
        ))}
      
    </BottomNavigation>
  );
}
