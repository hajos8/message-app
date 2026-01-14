import { Fragment } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

//TODO add avatar image
export default function ContactsComponent({ data }) {
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
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Fragment>
            )) : <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>No contacts available.</Typography>}
        </List>
    );
}