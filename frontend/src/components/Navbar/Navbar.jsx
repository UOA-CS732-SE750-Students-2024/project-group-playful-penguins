import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { GoogleLogin } from "@react-oauth/google";
import {
  Link,
  MenuItem,
  ListItemIcon,
  Menu,
  Avatar,
  Divider
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext, useState } from "react";

export function Navbar() {
  const { isTakeout, changeCategory } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const buttonGroupStyles = {
    border: "2px solid white",
    padding: "4px 4px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "22px",
    marginTop: "4px",
    marginBottom: "4px",
    backgroundColor: "white",
  };

  const deselectedButton = {
    border: "2px solid white",
    color: "black",
    padding: "6px 26px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "24px",
    margin: "2px",
    backgroundColor: "white",
    ":hover": {
      border: "1px solid " + `${isTakeout ? "#8e6a70" : "#007a68"}`, // Darker border color on hover
    },
    transition: "background-color 0.3s ease",
    outline: "none",
    cursor: "pointer",
  };

  const selectedButton = {
    border: "2px solid " + `${isTakeout ? "#edb1bb" : "#00ccbb"}`,
    color: "black",
    padding: "6px 26px",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "24px",
    margin: "2px",
    backgroundColor: `${isTakeout ? "#edb1bb" : "#00ccbb"}`,
    ":hover": {
      backgroundColor: `${isTakeout ? "#edb1bb" : "#00ccbb"}`, // Darker background color on hover
      border: "1px solid " + `${isTakeout ? "#8e6a70" : "#007a68"}`, // Darker border color on hover
    },
    transition: "background-color 0.3s ease",
    outline: "none",
    cursor: "pointer",
  };

  const responseMessage = (response) => {
    console.log(response);
  }

  const errorMessage = (error) => {
    console.log(error);
  }

  return (
    <AppBar
      position="static"
      style={
        isTakeout
          ? { backgroundColor: "#edb1bb" }
          : { backgroundColor: "#b2dfdb" }
      }
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            href="/"
            underline="none"
            sx={{
              display: { xs: "none", md: "flex" },
            }}
          >
            <img
              src="images/app-logo.png"
              alt="Penguin Logo"
              width="80"
              height="80"
            />
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              backgroundColor: `${isTakeout ? "#edb1bb" : "#b2dfdb"}`,
              justifyContent: "center",
              width: "200px",
            }}
          >
            <Box style={buttonGroupStyles}>
              <Button
                sx={isTakeout ? selectedButton : deselectedButton}
                onClick={() => changeCategory(true)}
              >
                Takeout
              </Button>
              <Button
                sx={isTakeout ? deselectedButton : selectedButton}
                onClick={() => changeCategory(false)}
              >
                Cook
              </Button>
            </Box>
          </Box>

          <IconButton onClick={handleClick} color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <GoogleLogin onSuccess={responseMessage} onError={errorMessage}></GoogleLogin>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
