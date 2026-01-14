import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Button, Container, Typography, TextField, InputAdornment, IconButton, FormHelperText } from "@mui/material"

import '../styles/AuthPages.css'

export default function RegisterPage({ setOpenSnackbar, setSnackbarMessage, setLoading }) {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    const [showPassword, setShowPassword] = useState({
        password: false,
        passwordConfirm: false,
    });

    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        fetch("/.netlify/functions/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: formValues.username,
                email: formValues.email,
                password: formValues.password,
            })
        })
            .then(async res => {
                if (!res.ok) {
                    const errData = await res.json();
                    setSnackbarMessage('Registration failed. ' + (errData.error || 'Please try again.'));
                    setOpenSnackbar(true);
                }
                else {
                    setSnackbarMessage('Registration successful. You can now log in.');
                    setOpenSnackbar(true);
                    navigate("/login");
                }
            })
            .catch(err => {
                setSnackbarMessage('Registration failed.Please try again.');
                setOpenSnackbar(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Container className="container">
            <Typography
                variant="h5"
                align="center"
                sx={{ fontWeight: 'bold' }}
            >
                Register
            </Typography>
            <form
                onSubmit={(e) => handleSubmit(e)}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    margin: '15px'
                }}
                autoComplete="off"
            >
                <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    value={formValues.username}
                    placeholder='Username'
                    name='username'
                    required
                    sx={{
                        marginTop: '10px'
                    }}
                />
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
                        marginTop: '10px'
                    }}
                />
                <TextField
                    id="password"
                    label="Password"
                    variant="outlined"
                    type={showPassword.password ? 'text' : 'password'}
                    onChange={(e) => handleChange(e)}
                    value={formValues.password}
                    name='password'
                    placeholder="Password"
                    required
                    sx={{
                        marginTop: '10px'
                    }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword({ ...showPassword, password: showPassword.password ? false : true })} sx={{ color: '#646cff' }}>
                                        {
                                            showPassword.password ? <VisibilityOffIcon /> : <VisibilityIcon />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                {
                    formValues.password !== formValues.passwordConfirm && <FormHelperText sx={{ color: 'red', fontWeight: 'bold' }}>Passwords do not match!</FormHelperText>
                }
                <TextField
                    id="passwordConfirm"
                    label="Confirm password"
                    variant="outlined"
                    type={showPassword.confirm ? 'text' : 'password'}
                    onChange={(e) => handleChange(e)}
                    value={formValues.passwordConfirm}
                    name='passwordConfirm'
                    placeholder="Confirm password"
                    required
                    sx={{
                        marginTop: '10px'
                    }}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword({ ...showPassword, confirm: showPassword.confirm ? false : true })} sx={{ color: '#646cff' }}>
                                        {
                                            showPassword.confirm ? <VisibilityOffIcon /> : <VisibilityIcon />
                                        }
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                {
                    formValues.password !== formValues.passwordConfirm && <FormHelperText sx={{ color: 'red', fontWeight: 'bold' }}>Passwords do not match!</FormHelperText>
                }

                {
                    formValues.password.length < 8 && <FormHelperText sx={{ color: '#646cff', fontWeight: 'bold' }}>Password must be at least 8 characters long!</FormHelperText>
                }

                {
                    formValues.password !== formValues.passwordConfirm || formValues.password.length === 0 || formValues.username.length === 0 || formValues.email.length === 0 || formValues.password.length < 8
                        ?
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}
                            disabled
                        >
                            Register
                        </Button>
                        :
                        <Button
                            type="submit"
                            variant="contained"
                            sx={{
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}
                            className="buttons"
                        >
                            Create account
                        </Button>

                }
                <Typography variant="subtitle1">
                    Do you have an account? <Link to='/login' className="link">Login here</Link>
                </Typography>

            </form>
        </Container>
    )
}