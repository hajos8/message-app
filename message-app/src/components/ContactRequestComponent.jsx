import React, { useState } from 'react';
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

export default function ContactRequestComponent() {
    const [requests, setRequests] = useState([
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
    ]);

    const handleAccept = (id) => {
        setRequests(requests.filter(req => req.id !== id));
    };

    const handleDecline = (id) => {
        setRequests(requests.filter(req => req.id !== id));
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Stack spacing={2}>
                {requests.map((request) => (
                    <Card key={request.id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Avatar alt="Avatar icon" src="/static/images/avatar/1.jpg" />
                        <CardContent sx={{ flex: 1 }}>
                            <Typography variant="h6" component="div">
                                {request.name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <IconButton
                                color="success"
                                onClick={() => handleAccept(request.id)}
                                title="Accept request"
                            >
                                <CheckIcon />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={() => handleDecline(request.id)}
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