import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { Link } from "react-router-dom";
import { styled } from "@mui/material";
export default function Buttombar() {
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
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#240750",
      }}
      value={value}
      onChange={handleChange}
    >
      <StyledBottomNavigationAction
        label="Employee"
        value="Employee"
        component={Link}
        to="employee"
        icon={<PeopleAltIcon />}
      />
      <StyledBottomNavigationAction
  
        label="Department"
        value="Department"
        component={Link}
        to="department"
        icon={<WebAssetIcon />}
      />
      
      <StyledBottomNavigationAction
        label="Role"
        value="Role"
        component={Link}
        to="role"
        icon={<WysiwygIcon />}
      />
      <StyledBottomNavigationAction
        label="KPI"
        value="KPI"
        component={Link}
        to="kpi"
        icon={<ListAltIcon />}
      />
    </BottomNavigation>
  );
}
