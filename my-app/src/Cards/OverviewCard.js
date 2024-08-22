import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import WysiwygSharpIcon from "@mui/icons-material/WysiwygSharp";
import { Badge, Grid } from "@mui/material";
import Groups2SharpIcon from "@mui/icons-material/Groups2Sharp";
import AppsIcon from "@mui/icons-material/Apps";

const card = (
    <React.Fragment>
      <CardContent>
        <Grid container>
          <Grid item xs={12}>
            <Typography
              sx={{ fontSize: 14, mb: "20px" }}
              color="text.secondary"
              gutterBottom
            >
              Organizational Summary:
            </Typography>
          </Grid>
          <Grid
            container
            xs={12}
            spacing={1}
            direction="row"
            sx={{ justifyContent: "centre", alignItems: "centre" }}
          >
            <Grid
              item
              xs={3.5}
              sx={{ justifyContent: "centre", alignItems: "centre" }}
            >
              <Badge
                badgeContent="24"
                color="primary"
                badgeStyle={{
                  fontSize: 24, // increase font size
                  fontWeight: 600, // make it bold
                  padding: "8px 12px", // add some padding
                  borderRadius: 10, // add some rounded corners
                }}
              >
                <Groups2SharpIcon
                  color="primary"
                  sx={{ height: "60px", width: "60px", ml: "17px" }}
                />
              </Badge>
              <Typography
                sx={{ fontSize: 13 }}
                color="text.secondary"
                gutterBottom
              >
                Total Employee
              </Typography>
            </Grid>
            <Grid item xs={4.5} sx={{ ml: "5px" }}>
              <Badge
                badgeContent="24"
                color="primary"
                badgeStyle={{
                  fontSize: 24, // increase font size
                  fontWeight: 600, // make it bold
                  padding: "8px 12px", // add some padding
                  borderRadius: 10, // add some rounded corners
                }}
              >
                <WysiwygSharpIcon
                  color="primary"
                  sx={{ height: "60px", width: "60px", ml: "20px" }}
                />
              </Badge>
              <Typography
                sx={{ fontSize: 13 }}
                color="text.secondary"
                gutterBottom
              >
                Total Departments
              </Typography>
            </Grid>
            <Grid item xs={3.5}>
              <Badge
                badgeContent="24"
                color="primary"
                badgeStyle={{
                  fontSize: 24, // increase font size
                  fontWeight: 600, // make it bold
                  padding: "8px 12px", // add some padding
                  borderRadius: 10, // add some rounded corners
                }}
              >
                <AppsIcon
                  color="primary"
                  sx={{ height: "60px", width: "60px", ml: "0px" }}
                />
              </Badge>
              <Typography
                sx={{ fontSize: 13 }}
                color="text.secondary"
                gutterBottom
              >
                Total Roles
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </React.Fragment>
  );


export default function OverviewCard() {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
