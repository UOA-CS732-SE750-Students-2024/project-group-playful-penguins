import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import {
  Link,
  MenuItem,
  ListItemIcon,
  Menu,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export function Navbar() {
  const navigate = useNavigate();
  const { isTakeout, changeCategory } = useContext(AppContext);
  const location = useLocation();
  const isRecipePage = location.pathname.startsWith("/home/recipe/");
  const [userName, setUserName] = useState(
    sessionStorage.getItem("token")
      ? jwtDecode(sessionStorage.getItem("token")).name
      : ""
  );
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    sessionStorage.clear();
    navigate("/login");
  };

  const buttonGroupStyles = {
    border: "2px solid white",
    padding: "4px 4px",
    textAlign: "center",
    textDecoration: "none",
    display: { xs: "flex", md: "inline-flex" },
    flexDirection: "row",
    fontSize: { xs: "8px", md: "14px" },
    fontWeight: "bold",
    borderRadius: "22px",
    marginTop: "4px",
    marginBottom: "4px",
    backgroundColor: "white",
  };

  const deselectedButton = {
    border: "2px solid white",
    color: "black",
    padding: { xs: "3px 12px", sm: "6px 26px" },
    textAlign: "center",
    textDecoration: "none",
    display: "inline-block",
    fontSize: { xs: "10px", md: "14px" },
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
    textAlign: "center",
    padding: { xs: "3px 12px", sm: "6px 26px" },
    textDecoration: "none",
    display: "inline-block",
    fontSize: { xs: "10px", md: "14px" },
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

  return (
    <AppBar
      position="static"
      style={
        isTakeout
          ? { backgroundColor: "#edb1bb" }
          : { backgroundColor: "#b2dfdb" }
      }
      sx={{
        height: {
          xs: "60px",
          md: "100px",
        },
      }}
    >
      <Container maxWidth="xl" sx={{ height: "100%" }}>
        <Toolbar
          disableGutters
          sx={{
            height: "100%",
          }}
        >
          <Link
            href="/"
            underline="none"
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "40px",
                  sm: "60px",
                  md: "80px",
                },
                height: {
                  xs: "40px",
                  sm: "60px",
                  md: "80px",
                },
              }}
            >
              <img
                src="images/app-logo.png"
                alt="Penguin Logo"
                width="100%"
                height="100%"
              />
            </Box>
          </Link>

          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              backgroundColor: `${isTakeout ? "#edb1bb" : "#b2dfdb"}`,
              justifyContent: "center",
              width: { xs: "100px", md: "200px" },
              visibility: isRecipePage ? "hidden" : "visible",
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
                onClick={() => {
                  changeCategory(false);
                }}
              >
                Cook
              </Button>
            </Box>
          </Box>

          <IconButton
            aria-label="profile-icon"
            onClick={handleClick}
            color="inherit"
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Typography
                fontWeight="fontWeightBold"
                sx={{
                  fontSize: {
                    xs: "10px",
                    md: "16px",
                  },
                }}
                style={{ color: "black" }}
              >
                Hi, {userName} !
              </Typography>
              <AccountCircleIcon />
            </Box>
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
            <MenuItem onClick={handleClose}></MenuItem>
            <MenuItem onClick={handleLogout}>
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
