import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";

function Navigation() {
  const location = useLocation();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          CV Builder
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={Link}
            to="/editor"
            variant={location.pathname === "/editor" ? "outlined" : "text"}
          >
            Editor
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/preview"
            variant={location.pathname === "/preview" ? "outlined" : "text"}
          >
            Preview
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;
