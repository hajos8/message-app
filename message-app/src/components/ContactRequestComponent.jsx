import React, { useEffect, useState } from 'react';
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
    const handleAccept = (request) => {

        setLoading(true);
        fetch('/.netlify/functions/postAcceptRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromUserId: request.from_id, toUserId: request.to_id }),
        })
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to accept friend request');
                }
                else {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Friend request accepted successfully');
                    setUserRequests(userRequests.filter(req => req.id !== request.id));
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
        setLoading(true);
        fetch('/.netlify/functions/deleteDeclineRequest', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromUserId: request.from_id, toUserId: request.to_id }),
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

    return userRequests.length === 0 ? (
        null
    ) : (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h5" gutterBottom>
                Friend Requests
            </Typography>
            <Stack spacing={2}>
                {userRequests.map((request, idx) => (
                    <Card key={idx} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar alt="Avatar icon" src="/static/images/avatar/1.jpg" />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6" component="div">
                                {request.username}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton
                                color="success"
                                onClick={() => handleAccept(request)}
                                title="Accept request"
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => handleDecline(request)}
                                title="Decline request"
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