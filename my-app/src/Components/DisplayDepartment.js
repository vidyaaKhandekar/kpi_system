import React from 'react'
import { List, ListItem, ListItemIcon, ListItemText ,IconButton, Paper} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
const DisplayDepartment = ({DepartmentList}) => {
  return (
    <Paper sx={{width:"60%",justifyContent:"center", alignSelf:"center" ,paddingTop:"50px"}} 
    >
    <List sx={{width: '100%',
    maxWidth: 750,
    bgcolor: 'background.paper',
    position: 'relative',
    overflow: 'auto',
    maxHeight: 400,
    }}>
            {DepartmentList.map((item,index)=>(
                <ListItem  key={DepartmentList.id}>
                   
                        <ListItemText primary={item.name} />
                        <IconButton>
                        <ListItemIcon>
                            <DeleteIcon/>
                        </ListItemIcon>
                    </IconButton>
                </ListItem>
            ))}
    
    </List>
    </Paper>
  )
}

export default DisplayDepartment
