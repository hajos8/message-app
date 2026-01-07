import { useState } from "react"
import { Box, Paper, TextField, FormControl, Button, Typography, InputLabel, IconButton, InputAdornment, Container } from "@mui/material"
import { Link } from "react-router-dom"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import '../styles/AuthPages.css'

export default function LoginPage() {
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Container>
                <Typography
                    variant="h5"
                    align="center"
                    sx={{ fontWeight: 'bold' }}
                >
                    Login
                </Typography>

                <form
                    onSubmit={(e) => handleSubmit(e)}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        margin: '15px'
                    }}
                >
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        type="email"
                        onChange={(e) => handleChange(e)}
                        value={formValues.email}
                        placeholder='Eg. example@email.com'
                        name='email'
                        required
                        sx={{
                            marginBottom: '10px'
                        }}
                    />

                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        onChange={(e) => handleChange(e)}
                        value={formValues.password}
                        name='password'
                        required
                        sx={{
                            marginBottom: '10px',
                        }}
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(showPassword ? false : true)} sx={{ color: '#646cff' }}>
                                            {
                                                showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />
                                            }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    {
                        formValues.password.length === 0 || formValues.email.length === 0
                            ?
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    marginBottom: '20px'
                                }}
                                disabled
                            >
                                Login
                            </Button>
                            :
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{
                                    marginBottom: '20px'
                                }}
                                className="buttons"
                            >
                                Login
                            </Button>
                    }

                    <Typography variant="subtitle1">
                        Do not have an account? <Link to='/register' className="link">Register here</Link>
                    </Typography>
                </form>

            </Container>
        </>
    )
}