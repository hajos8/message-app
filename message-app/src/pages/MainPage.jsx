import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Chip, Container, Typography } from "@mui/material";
import "../styles/MainPage.css";

export default function MainPage({ loggedIn }) {
    return (
        <div className="main-page">
            <Container maxWidth="md" className="main-container">
                <Box className="main-shell">
                    <div className="hero-stack">
                        <Chip label="Fast. Simple. Secure." color="primary" variant="filled" className="hero-chip" />

                        <Typography component="h1" variant="h3" className="hero-title">
                            Stay close to your people.
                        </Typography>
                        <Typography variant="h6" className="hero-subtitle">
                            Chat, share updates, and keep every conversation organized across all your contacts.
                        </Typography>

                        <div className="hero-actions">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                component={RouterLink}
                                to={loggedIn ? "/messages" : "/login"}
                                className="hero-btn-primary"
                            >
                                {loggedIn ? "Open Messages" : "Log In"}
                            </Button>
                            {!loggedIn && (
                                <Button
                                    variant="outlined"
                                    color="inherit"
                                    size="large"
                                    component={RouterLink}
                                    to="/register"
                                    className="hero-btn-secondary"
                                >
                                    Create an account
                                </Button>
                            )}
                        </div>
                    </div>
                </Box>
            </Container>
        </div>
    );
}
