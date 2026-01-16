import { useState } from "react";
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Box } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";

export default function UserMenu({ setLoggedIn, setUserId, setUsername }) {
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

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Bal oldal üresen hagyva */}
                <Box sx={{ flexGrow: 1 }} />

                {/* Jobb felső sarok */}
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