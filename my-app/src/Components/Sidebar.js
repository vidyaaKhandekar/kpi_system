import { Box,List,ListItemIcon,ListItemButton,ListItem,ListItemText, styled } from "@mui/material";
import { AdminList } from "./Constant";
const Sidebar =()=>{
    const StyledListItem=styled(ListItem)({
        padding:"5px",
        height:"70px"
    })
    return(
        <Box bgcolor="#478CCF" flex={1} p={0} m={0} sx={{
            color:"white",
            display :{xs:"none",sm:"block"},
            height:"700px",
            boxShadow:"0px 4px 8px rgba(0,0,0,1)"
        }}>
            <List>
                {AdminList.map((item,index)=>(
                    <StyledListItem  key={index}>
                        <ListItemButton>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </StyledListItem>
                ))}
        
        </List>
        </Box>
    )
}
export default Sidebar;