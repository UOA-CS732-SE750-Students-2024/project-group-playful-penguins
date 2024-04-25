import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AppContext } from "../../providers/AppContextProvider";
import { useContext } from "react";

export function Navbar() {
  const { isTakeout, changeCategory } = useContext(AppContext);

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

          <IconButton color="inherit" component={RouterLink} to="/profile">
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
