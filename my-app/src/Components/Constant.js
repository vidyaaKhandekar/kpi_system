import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import ListAltIcon from '@mui/icons-material/ListAlt';


const commonSx={
    color:"white",
    fontSize:"30px"
}
export const EmployeeList=[

    {
        icon:<DashboardIcon sx={commonSx}/>,
        text:"My Performance"

    },
    {
        icon:<GroupsIcon sx={commonSx}/>,
            text:"My Performance"
    
    }
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