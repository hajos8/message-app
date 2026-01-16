import { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box, Typography } from "@mui/material";
import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";

export default function UserMenu({ setLoggedIn, setUserId, username, setUsername, onMenuToggle, showMenuToggle = false }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        setLoggedIn(false);
        setUserId(null);
        setUsername(null);
    };

    //console.log("NavBarComponent username:", username);

    return (
        <AppBar position="static">
            <Toolbar>
                {showMenuToggle && (
                    <IconButton
                        size="large"
                        color="inherit"
                        onClick={onMenuToggle}
                        edge="start"
                        sx={{ mr: 1 }}
                        aria-label="open sidebar"
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                <Box sx={{ flexGrow: 1 }} />

                <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
                    {username}
                </Typography>
                <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleMenuOpen}
                >
                    <AccountCircle />
                </IconButton>

                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "right",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                >
                    <MenuItem onClick={handleLogout}>
                        Kijelentkezés
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};