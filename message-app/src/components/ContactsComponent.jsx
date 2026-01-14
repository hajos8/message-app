import { Fragment } from 'react';
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
export default function ContactsComponent({ data, canBeAdded }) {
    return (
        <List sx={{ width: '100%', maxWidth: 360 }}>

            {data ? data.map((elem, idx) => (
                <Fragment key={idx}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Avatar icon" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={elem.username}
                        />
                        {canBeAdded &&
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