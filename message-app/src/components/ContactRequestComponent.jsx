import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
    Container,
    Card,
    CardContent,
    CardActions,
    Typography,
    Avatar,
    IconButton,
    Box,
    Stack,
} from '@mui/material';
import { Check as CheckIcon, Close as CloseIcon } from '@mui/icons-material';

export default function ContactRequestComponent({ userId, userRequests, setUserRequests, setOpenSnackbar, setSnackbarMessage, loading, setLoading }) {
    const theme = useTheme();
    const palette = theme.palette.mode === 'dark'
        ? {
            cardBg: 'linear-gradient(145deg, #1f2128 0%, #252935 100%)',
            border: '#2f3340',
            shadow: '0 10px 30px rgba(0,0,0,0.45)',
            text: '#f3f4f6',
            sub: '#9ea4b3',
        }
        : {
            cardBg: 'linear-gradient(145deg, #ffffff 0%, #f7f9fc 100%)',
            border: '#e6e9f2',
            shadow: '0 8px 20px rgba(0,0,0,0.08)',
            text: '#1c1e21',
            sub: '#6b7280',
        };
    const handleAccept = (request) => {
        console.log('Accepting request:', request);
        setLoading(true);
        fetch('/.netlify/functions/postAcceptRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromUserId: request.from_id, toUserId: userId }),
        })
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to accept friend request');
                }
                else {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Friend request accepted successfully');
                    setUserRequests(userRequests.filter(req => req.from_id !== request.from_id));
                }
            })
            .catch(error => {
                console.error('Error accepting friend request:', error);
                setOpenSnackbar(true);
                setSnackbarMessage('Error accepting friend request');
            })
            .finally(() => {
                setLoading(false);
            });

    };

    const handleDecline = (request) => {
        console.log('Declining request:', request);
        setLoading(true);
        fetch('/.netlify/functions/deleteDeclineRequest', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromUserId: request.from_id, toUserId: userId }),
        })
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to decline friend request');
                }
                else {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Friend request declined successfully');
                    setUserRequests(userRequests.filter(req => req.id !== request.id));
                }
            })
            .catch(error => {
                console.error('Error declining friend request:', error);
                setOpenSnackbar(true);
                setSnackbarMessage('Error declining friend request');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return userRequests.length === 0 ? null : (
        <Container maxWidth="sm" sx={{ py: 2 }}>
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 700, color: palette.text }}>
                    Friend Requests
                </Typography>
                <Typography variant="body2" sx={{ color: palette.sub }}>
                    {userRequests.length} pending
                </Typography>
            </Box>
            <Stack spacing={1.5}>
                {userRequests.map((request, idx) => (
                    <Card
                        key={idx}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            px: 1.5,
                            py: 1,
                            borderRadius: 2,
                            boxShadow: palette.shadow,
                            border: `1px solid ${palette.border}`,
                            background: palette.cardBg,
                        }}
                    >
                        <Avatar
                            alt="Avatar icon"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 46, height: 46, border: '2px solid #e8ecf4' }}
                        />
                        <CardContent sx={{ flex: 1, py: 1 }}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: palette.text }}>
                                {request.username}
                            </Typography>
                            <Typography variant="body2" sx={{ color: palette.sub }}>
                                wants to connect
                            </Typography>
                        </CardContent>
                        <CardActions sx={{ gap: 0.5 }}>
                            <IconButton
                                color="success"
                                onClick={() => handleAccept(request)}
                                title="Accept request"
                                sx={{
                                    backgroundColor: 'rgba(49, 162, 76, 0.1)',
                                    '&:hover': { backgroundColor: 'rgba(49, 162, 76, 0.2)' },
                                }}
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => handleDecline(request)}
                                title="Decline request"
                                sx={{
                                    backgroundColor: 'rgba(234, 67, 53, 0.1)',
                                    '&:hover': { backgroundColor: 'rgba(234, 67, 53, 0.2)' },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                ))}
            </Stack>
        </Container>
    );
}