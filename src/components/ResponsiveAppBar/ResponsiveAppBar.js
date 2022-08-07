import React from "react";
import {
  Toolbar,
  IconButton,
  Container,
  Box,
  AppBar,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.png";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetNav } from "../../slices/appBarSlice";
import { resetAppUser } from "../../slices/appUserSlice";
import { useDispatch } from "react-redux";

// RENDERING MULTIPLE MENUITEMS IN APPBAR MENUE
export const MenuItems = ({ navLink }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <Box
        sx={{
          flexGrow: 0,
          display: { xs: "none", md: "flex" },
        }}
      >
        <Button
          sx={{ color: "black" }}
          style={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: "13.5px",
            cursor: "pointer",
            textTransform: "none",
          }}
          onClick={() => {
            if (navLink.navto === "") {
              dispatch(resetNav());
              dispatch(resetAppUser());
              navigate(`/${navLink.navto}`);
            } else {
              navigate(`/${navLink.navto}`);
            }
          }}
        >
          {navLink.name}
        </Button>
      </Box>
    </>
  );
};

const ResponsiveAppBar = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const navuser = useSelector((state) => state.appBar.navuser);

  const [anchorElUser, setAnchorElNav] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElNav(null);
  };

  const UserMenus = [
    { name: "Dashboard", navto: "userdashboard" },
    { name: "Rescue Request", navto: "rescuerequest" },
    { name: "Adoptions", navto: "adoptions" },
    { name: "Supplies", navto: "supplies" },
    { name: "Donate", navto: "donate" },
    { name: "gallery", navto: "gallery" },
    { name: "Events", navto: "events" },
    { name: "Rescue Vehicle", navto: "rescuevehicle" },
    { name: "Logout", navto: "" },
  ];

  const ShelterMenus = [
    { name: "Dashboard", navto: "shelterdashboard" },
    { name: "View RR", navto: "viewrr" },
    { name: "Accepted Req.", navto: "acceptedreq" },
    { name: "List Pet", navto: "listpet" },
    { name: "List Supplies", navto: "listsupplies" },
    { name: "Gallery", navto: "listgallery" },
    { name: "Event", navto: "listevents" },
    { name: "Rescue Vehicle", navto: "rescuevehicle" },
    { name: "Logout", navto: "" },
  ];

  const AdminMenus = [
    { name: "Dashboard", navto: "admindashboard" },
    { name: "View RR", navto: "viewrr" },
    { name: "Adoptions", navto: "adoptions" },
    { name: "Supplies", navto: "supplies" },
    { name: "gallery", navto: "gallery" },
    { name: "Events", navto: "events" },
    { name: "Rescue Vehicle", navto: "rescuevehicle" },
    { name: "Logout", navto: "" },
  ];

  const RescuevanMenus = [
    { name: "Dashboard", navto: "userdashboard" },
    { name: "Update status", navto: "updatestatus" },
    { name: "Logout", navto: "" },
  ];

  return (
    <AppBar
      position="sticky"
      style={{
        backgroundColor: "#F7F7F7",
        color: "black",
        // height: "40px",
        // verticalAlign: "center",
      }}
      elevation={7}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component="img"
            src={logo}
            alt="Company Logo"
            sx={{
              height: "2rem",
              width: "2rem",
              paddingRight: "2rem",
              //   pl: { xs: "1rem", md: 0 },
            }}
          />

          {/* RENDERING APPBAR MENU ITEMS */}

          {navuser === "login" && null}
          {navuser === "register" && null}
          {navuser === "user" &&
            UserMenus.map((element, i) => {
              return <MenuItems navLink={element} key={i} />;
            })}
          {navuser === "shelter" &&
            ShelterMenus.map((element, i) => {
              return <MenuItems navLink={element} key={i} />;
            })}
          {navuser === "admin" &&
            AdminMenus.map((element, i) => {
              return <MenuItems navLink={element} key={i} />;
            })}
          {navuser === "rescuevan" &&
            RescuevanMenus.map((element, i) => {
              return <MenuItems navLink={element} key={i} />;
            })}

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              justifyContent: "end",
            }}
          >
            <IconButton
              size="large"
              color="inherit"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenUserMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {navuser === "login" && null}
              {navuser === "register" && null}
              {navuser === "user" &&
                UserMenus.map((menu) => (
                  <MenuItem
                    key={menu.name}
                    onClick={() => {
                      if (menu.navto === "") {
                        dispatch(resetNav());
                        dispatch(resetAppUser());
                        navigate(`/${menu.navto}`);
                        handleCloseUserMenu();
                      } else {
                        navigate(`/${menu.navto}`);
                        handleCloseUserMenu();
                      }
                    }}
                  >
                    <Typography textAlign="center">{menu.name}</Typography>
                  </MenuItem>
                ))}
              {navuser === "shelter" &&
                ShelterMenus.map((menu) => (
                  <MenuItem
                    key={menu.name}
                    onClick={() => {
                      if (menu.navto === "") {
                        dispatch(resetNav());
                        dispatch(resetAppUser());
                        navigate(`/${menu.navto}`);
                        handleCloseUserMenu();
                      } else {
                        navigate(`/${menu.navto}`);
                        handleCloseUserMenu();
                      }
                    }}
                  >
                    <Typography textAlign="center">{menu.name}</Typography>
                  </MenuItem>
                ))}
              {navuser === "admin" &&
                AdminMenus.map((menu) => (
                  <MenuItem
                    key={menu.name}
                    onClick={() => {
                      if (menu.navto === "") {
                        dispatch(resetNav());
                        dispatch(resetAppUser());
                        navigate(`/${menu.navto}`);
                        handleCloseUserMenu();
                      } else {
                        navigate(`/${menu.navto}`);
                        handleCloseUserMenu();
                      }
                    }}
                  >
                    <Typography textAlign="center">{menu.name}</Typography>
                  </MenuItem>
                ))}
              {navuser === "rescuevan" &&
                RescuevanMenus.map((menu) => (
                  <MenuItem
                    key={menu.name}
                    onClick={() => {
                      if (menu.navto === "") {
                        dispatch(resetNav());
                        dispatch(resetAppUser());
                        navigate(`/${menu.navto}`);
                        handleCloseUserMenu();
                      } else {
                        navigate(`/${menu.navto}`);
                        handleCloseUserMenu();
                      }
                    }}
                  >
                    <Typography textAlign="center">{menu.name}</Typography>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
