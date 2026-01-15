import { use, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';

import ContactsComponent from "./ContactsComponent";
import SearchComponent from "./SearchComponent";

export default function TabComponent({ userContacts, userRequests, userSentRequests, userId, setOpenSnackbar, setSnackbarMessage }) {
    const [value, setValue] = useState("1");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Contacts" value="1" />
                        <Tab label="Search" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <ContactsComponent data={userContacts} userId={userId} type={"contact"} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
                </TabPanel>
                <TabPanel value="2">
                    <SearchComponent userId={userId} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
                </TabPanel>
            </TabContext>
        </Box>
    );
};
