import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUserCircle,
  faSignInAlt,
  faSignOutAlt,
  faCaretDown,
  faPlus,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Box, colors } from '@mui/material';

const Header = () => {
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useContext(AuthContext); // Get user from AuthContext
  console.log(user);
  
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state

  const handleLogout = () => {
    logout();
    navigate("/"); // Redirect to homepage after logging out
  };

  // Toggle dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4d5656', boxShadow: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo and Welcome Message */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>
              <FontAwesomeIcon size="lg" />
              <span style={{ marginLeft: '8px' }}>Evento</span>
            </Typography>
          </Link>

        </Box>

        {/* Right Side Box for Buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user && (
            <Typography variant="body1" sx={{ marginLeft: 2, color:"white" }}>
              Welcome, {user.username}
            </Typography>
          )}
          {user ? (
            <>
              {/* Dropdown Toggle Button */}
              <IconButton onClick={handleMenuOpen}  sx={{ color: 'white' }}>
                <Typography variant="body1">Action</Typography> <FontAwesomeIcon icon={faCaretDown} style={{ marginLeft: '4px' }} />
              </IconButton>
              
              {/* Dropdown Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    maxHeight: 200,
                    width: '20ch',
                  },
                }}
              >
                <MenuItem onClick={handleMenuClose} component={Link} to="/create-event">
                  <FontAwesomeIcon icon={faPlus} style={{ marginRight: '8px' }} />
                  Create Event
                </MenuItem>
                <MenuItem onClick={handleMenuClose} component={Link} to="/my-events">
                  <FontAwesomeIcon icon={faListAlt} style={{ marginRight: '8px' }} />
                  My Events
                </MenuItem>
              </Menu>

              {/* Logout Button */}
              <Button
                variant="contained"
                color="black"
                onClick={handleLogout}
                startIcon={<FontAwesomeIcon icon={faSignOutAlt} />}
                sx={{ marginLeft: 2 }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="inherit"
                startIcon={<FontAwesomeIcon icon={faSignInAlt} />}
                sx={{ marginRight: 1 }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to="/register"
                variant="contained"
                sx={{ backgroundColor: '#dc363c', '&:hover': { backgroundColor: '#dc143c' } }}
                startIcon={<FontAwesomeIcon icon={faUserCircle} />}
              >
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
  </AppBar>
  );
};

export default Header;
