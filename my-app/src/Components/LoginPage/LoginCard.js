import React from 'react'
import { Grid,Card,CardContent,Typography} from "@mui/material";
const LoginCard = () => {

   
      return (
        <Card sx={{ width:'60%' ,mt:'20%',ml:'35%',p:'10%'}}>
          <CardContent>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 45,mb:'0'}}>
             Welcome to
            </Typography>
            <Typography variant="h5" component="div" sx={{fontSize: 45,fontFamily:'initial',color: 'primary'}}>
            KPI 
          </Typography>
            
            <Typography variant="body2">
              {'"track your progress '}
              <br />
              {'and achieve your goals"'}
            </Typography>
          </CardContent>
          
        </Card>
      );
    }
    


export default LoginCard
