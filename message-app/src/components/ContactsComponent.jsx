import { Fragment, useEffect, useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

//TODO add avatar image
export default function ContactsComponent({
    data,
    userId,
    userSentRequests, setUserSentRequests,
    type,
    setOpenSnackbar, setSnackbarMessage,
    loading, setLoading }) {

    const handleSendRequest = (contactId) => {
        setLoading(true);
        //console.log(`Send contact request to user with ID: ${contactId} from user with ID: ${userId}`);

        fetch('/.netlify/functions/postNewRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fromUserId: userId, toUserId: contactId }),
        })
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.error || 'Failed to send friend request');
                }
                else {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Friend request sent successfully');
                    setUserSentRequests(prev => [...prev, contactId]);
                }
            })
            .catch(error => {
                console.error('Error sending friend request:', error);
                setOpenSnackbar(true);
                setSnackbarMessage('Error sending friend request');
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>
            {data ? data.map((elem, idx) => (
                elem.id === userId ? null :
                    <Fragment key={idx}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar alt="Avatar icon" src="/static/images/avatar/1.jpg" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={elem.username}
                            />
                            {type === "search" && userSentRequests.includes(elem.id) ?
                                <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>Request Sent</Typography>
                                :
                                <IconButton
                                    edge="end"
                                    aria-label="add"
                                    sx={{
                                        color: '#0084ff',
                                        backgroundColor: 'rgba(0, 132, 255, 0.1)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 132, 255, 0.2)',
                                        }
                                    }}
                                    onClick={() => handleSendRequest(elem.id)}
                                >
                                    <AddIcon />
                                </IconButton>
                            }
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Fragment>
            )) : <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>No contacts available.</Typography>}
        </List>
    );
}