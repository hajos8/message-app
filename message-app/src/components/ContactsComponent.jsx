import { Fragment, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
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
    userContacts,
    setOpenSnackbar, setSnackbarMessage,
    loading, setLoading }) {

    const theme = useTheme();
    const palette = theme.palette.mode === 'dark'
        ? {
            cardBg: 'linear-gradient(145deg, #1f2128 0%, #252935 100%)',
            border: '#2f3340',
            shadow: '0 10px 26px rgba(0,0,0,0.45)',
            text: '#f3f4f6',
            sub: '#9ea4b3',
            chip: 'rgba(24, 119, 242, 0.16)',
        }
        : {
            cardBg: 'linear-gradient(145deg, #ffffff 0%, #f7f9fc 100%)',
            border: '#e6e9f2',
            shadow: '0 10px 26px rgba(0,0,0,0.1)',
            text: '#1c1e21',
            sub: '#6b7280',
            chip: 'rgba(24, 119, 242, 0.1)',
        };

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
        <List
            sx={{
                width: '100%',
                maxWidth: 480,
                background: palette.cardBg,
                borderRadius: 2,
                border: `1px solid ${palette.border}`,
                boxShadow: palette.shadow,
                overflow: 'hidden',
            }}
        >
            {data ? data.map((elem, idx) => (
                elem.id === userId ? null :
                    <Fragment key={idx}>
                        <ListItem alignItems="center" sx={{ py: 1.25, px: 1.75 }}>
                            <ListItemAvatar>
                                <Avatar alt="Avatar icon" src="/static/images/avatar/1.jpg" sx={{ width: 44, height: 44 }} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={elem.username}
                                primaryTypographyProps={{ fontWeight: 700, color: palette.text }}
                            />
                            {type == "search" && userSentRequests.includes(elem.id)
                                ?
                                <Typography variant="body2" sx={{ px: 2, color: palette.sub }}>Request Sent</Typography>
                                :
                                userContacts && userContacts.some(contact =>
                                    (contact.user1_id === elem.id || contact.user2_id === elem.id))
                                    ?
                                    <Typography variant="body2" sx={{ px: 2, color: palette.sub }}>Contact</Typography>
                                    :
                                    type !== "contacts" && ( // Only show the button if type is not contacts
                                        <IconButton
                                            edge="end"
                                            aria-label="add"
                                            sx={{
                                                color: '#1877f2',
                                                backgroundColor: palette.chip,
                                                '&:hover': {
                                                    backgroundColor: theme.palette.mode === 'dark'
                                                        ? 'rgba(24, 119, 242, 0.25)'
                                                        : 'rgba(24, 119, 242, 0.18)',
                                                }
                                            }}
                                            onClick={() => handleSendRequest(elem.id)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    )
                            }
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Fragment>
            )) : <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>No contacts available.</Typography>}
        </List>
    );
}