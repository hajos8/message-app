import { useState } from 'react';
import { Box, Tab } from '@mui/material';
import { TabPanel, TabContext, TabList } from '@mui/lab';

import ContactsComponent from "./ContactsComponent";
import SearchComponent from "./SearchComponent";
import ContactRequestComponent from './ContactRequestComponent';
import SpinnerComponent from './SpinnerComponent';

import '../styles/TabComponent.css';

export default function TabComponent({
    userContacts,
    userRequests, setUserRequests,
    userSentRequests, setUserSentRequests,
    userId,
    handleChangeChat,
    setOpenSnackbar, setSnackbarMessage }) {

    const [value, setValue] = useState("1");
    const [loading, setLoading] = useState(false);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box className="tab-container">
            <TabContext value={value}>
                <Box className="tab-header">
                    <TabList
                        onChange={handleChange}
                        aria-label="contact tabs"
                        textColor="primary"
                        indicatorColor="primary"
                    >
                        <Tab label="Contacts" value="1" />
                        <Tab label="Search" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1" className="tab-panel">
                    <ContactRequestComponent userId={userId} userRequests={userRequests} setUserRequests={setUserRequests} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                    <ContactsComponent data={userContacts} userId={userId} type={"contacts"} handleChangeChat={handleChangeChat} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                </TabPanel>
                <TabPanel value="2" className="tab-panel">
                    <ContactRequestComponent userId={userId} userRequests={userRequests} setUserRequests={setUserRequests} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                    <SearchComponent userId={userId} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} userSentRequests={userSentRequests} setUserSentRequests={setUserSentRequests} loading={loading} setLoading={setLoading} userContacts={userContacts} />
                </TabPanel>
            </TabContext>
            {loading && <SpinnerComponent />}
        </Box>
    );
};
