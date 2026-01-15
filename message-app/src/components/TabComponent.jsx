import { use, useState } from 'react';
import { Box, Tabs, Tab } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';

import ContactsComponent from "./ContactsComponent";
import SearchComponent from "./SearchComponent";
import ContactRequestComponent from './ContactRequestComponent';

import SpinnerComponent from './SpinnerComponent';

export default function TabComponent({
    userContacts,
    userRequests, setUserRequests,
    userSentRequests, setUserSentRequests,
    userId,
    setOpenSnackbar, setSnackbarMessage }) {

    const [value, setValue] = useState("1");
    const [loading, setLoading] = useState(false);

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
                    <ContactRequestComponent userId={userId} userRequests={userRequests} setUserRequests={setUserRequests} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                    <ContactsComponent data={userContacts} userId={userId} type={"contacts"} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                </TabPanel>
                <TabPanel value="2">
                    <ContactRequestComponent userId={userId} userRequests={userRequests} setUserRequests={setUserRequests} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                    <SearchComponent userId={userId} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} userSentRequests={userSentRequests} setUserSentRequests={setUserSentRequests} loading={loading} setLoading={setLoading} userContacts={userContacts} />
                </TabPanel>
            </TabContext>
            {loading && <SpinnerComponent />}
        </Box>
    );
};
