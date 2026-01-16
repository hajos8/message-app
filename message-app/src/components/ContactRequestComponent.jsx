import React from 'react';
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
import PersonIcon from '@mui/icons-material/Person';

import '../styles/ContactRequest.css';

export default function ContactRequestComponent({ userId, userRequests, setUserRequests, setOpenSnackbar, setSnackbarMessage, loading, setLoading }) {
    const handleAccept = (request) => {
        //console.log('Accepting request:', request);
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
        //console.log('Declining request:', request);
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
        <Container maxWidth="sm" className="contact-request-container">
            <Box className="contact-request-header">
                <Typography variant="h6" className="contact-request-title">
                    Friend Requests
                </Typography>
                <Typography variant="body2" className="contact-request-count">
                    {userRequests.length} pending
                </Typography>
            </Box>
            <Stack className="contact-request-list">
                {userRequests.map((request, idx) => (
                    <Card key={idx} className="contact-request-card">
                        <Avatar className="contact-request-avatar" aria-label="user avatar">
                            <PersonIcon className="contact-request-avatar-icon" />
                        </Avatar>
                        <CardContent className="contact-request-content">
                            <Typography variant="subtitle1" className="contact-request-name">
                                {request.username}
                            </Typography>
                            <Typography variant="body2" className="contact-request-subtitle">
                                wants to connect
                            </Typography>
                        </CardContent>
                        <CardActions className="contact-request-actions">
                            <IconButton
                                color="success"
                                onClick={() => handleAccept(request)}
                                title="Accept request"
                                className="contact-request-accept"
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => handleDecline(request)}
                                title="Decline request"
                                className="contact-request-decline"
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