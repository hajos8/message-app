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

            {data.map((elem, idx) => (
                <Fragment key={idx}>
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt="Avatar icon" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                            primary={elem.name}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Fragment>
            ))}
        </List>
    );
}