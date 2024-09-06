import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupsIcon from "@mui/icons-material/Groups";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import WebAssetIcon from "@mui/icons-material/WebAsset";
import ListAltIcon from "@mui/icons-material/ListAlt";
import TekdiLogo from "./TekdiLogo.png";


const commonSx = {
  margin: "10px",
  color: "white",
  fontSize: "30px",
};
export const EmplList = [
  {
    icon: <DashboardIcon sx={commonSx} />,
    text: "Employee",
  },
  {
    icon: <GroupsIcon sx={commonSx} />,
    text: "Approvar",
  },
];

export const AdminList = [
  {
    icon: <PeopleAltIcon sx={commonSx} />,
    text: "Employee",
  },
  {
    icon: <WebAssetIcon sx={commonSx} />,
    text: "Department",
  },
  {
    icon: <WysiwygIcon sx={commonSx} />,
    text: "Role",
  },
  {
    icon: <ListAltIcon sx={commonSx} />,
    text: "KPI",
  },
];
export const logo = (
  <img
    src={TekdiLogo}
    height={30}
    width={30}
    alt="Tekdi LOGO"
    style={{ backgroundColor: "white", borderRadius: "5px" }}
  />
);
export const LoginLogo =  (
  <img
    src={TekdiLogo}
    height={60}
    width={60}
    alt="Tekdi LOGO"
    style={{ backgroundColor: "primary", borderRadius: "5px" }}
    
  />
);

export const commonList = [
  {
    icon: (
      <img
        src={TekdiLogo}
        height={50}
        width={55}
        alt="Tekdi LOGO"
        style={{ backgroundColor: "white", borderRadius: "5px" }}
      />
    ),
    text: "TEKDI",
  },
];
export const deleteDepartmentUrl = "http://localhost:4000/api/dept/delete";
export const deleteRoleUrl = "http://localhost:4000/api/role/delete";

///bottomBar list for admin

export const AdminBottomBar = [
  {
    label: "Employee",
    to: "employee",
    icon: <PeopleAltIcon />,
  },
  {
    label: "Department",
    to: "department",
    icon: <WebAssetIcon />,
  },
  {
    label: "Role",
    to: "role",
    icon: <WysiwygIcon />,
  },
  {
    label: "KPI",
    to: "kpi",
    icon: <ListAltIcon />,
  },
];
export const EmployeeBottomBar = [
  {
    label: "Employee",
    to: "employee",
    icon: <DashboardIcon />,
  },
  {
    label: "Approvar",
    to: "approvar",
    icon: <GroupsIcon />,
  },
];
