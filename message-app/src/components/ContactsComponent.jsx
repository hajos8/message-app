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

import '../styles/Contacts.css';

//TODO add avatar image
export default function ContactsComponent({
    data,
    userId,
    userSentRequests, setUserSentRequests,
    type,
    userContacts,
    handleChangeChat,
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

    //console.log("ContactsComponent data:", data);

    return (
        <List className="contacts-list">
            {data ? data.map((elem, idx) => (
                elem.id === userId ? null :
                    <Fragment key={idx}>
                        <ListItem
                            alignItems="center"
                            className="contacts-list-item"
                            {...(type === "contacts" ? { onClick: () => handleChangeChat(elem.user2_id) } : { secondaryAction: null })}
                        >
                            <ListItemAvatar>
                                <Avatar alt="Avatar icon" src="/static/images/avatar/1.jpg" className="contacts-avatar" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={elem.username}
                                className="contacts-list-item-text"
                            />
                            {type == "search" && userSentRequests.includes(elem.id)
                                ?
                                <Typography variant="body2" className="contacts-request-sent">Request Sent</Typography>
                                :
                                userContacts && userContacts.some(contact =>
                                    (contact.user1_id === elem.id || contact.user2_id === elem.id))
                                    ?
                                    <Typography variant="body2" className="contacts-contact-label">Contact</Typography>
                                    :
                                    type !== "contacts" && ( // Only show the button if type is not contacts
                                        <IconButton
                                            edge="end"
                                            aria-label="add"
                                            className="contacts-add-button"
                                            onClick={() => handleSendRequest(elem.id)}
                                        >
                                            <AddIcon />
                                        </IconButton>
                                    )
                            }
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Fragment>
            )) : <Typography variant="body2" color="text.secondary" className="contacts-no-data">No contacts available.</Typography>}
        </List>
    );
}