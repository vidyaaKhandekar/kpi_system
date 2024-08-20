import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import ListAltIcon from '@mui/icons-material/ListAlt';
import TekdiLogo from "./TekdiLogo.png";

const commonSx={
    margin:"10px",
    color:"white",
    fontSize:"30px"
}
export const EmployeeList=[

    {
        icon:{TekdiLogo},
        text:"TEKDI"
    },
    {
        icon:<DashboardIcon sx={commonSx}/>,
        text:"My Performance"

    },
    {
        icon:<GroupsIcon sx={commonSx}/>,
            text:"My Performance"
    
    }
]
export const logo=<img src={TekdiLogo} height={30} width={30} alt="Tekdi LOGO" style={{backgroundColor:"white",borderRadius:"5px"}}/>;

export const commonList=[
    {
        icon:<img src={TekdiLogo} height={50} width={55} alt="Tekdi LOGO" style={{backgroundColor:"white",borderRadius:"5px"}}/>,
        text:"TEKDI"
    },
]
export const AdminList=[

    
    {
        icon:<PeopleAltIcon sx={commonSx}/>,
        text:"Employee"

    },
    {
        icon:<WebAssetIcon sx={commonSx}/>,
            text:"Department"
    
    },{
        icon:<WysiwygIcon sx={commonSx}/>,
        text:"Role"

    },
    {
        icon:<ListAltIcon sx={commonSx}/>,
            text:"KPI"
    
    }
]
 export const deleteDepartmentUrl="http://localhost:4000/api/dept/delete";
 export const deleteRoleUrl="http://localhost:4000/api/role/delete";