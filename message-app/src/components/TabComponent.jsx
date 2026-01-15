import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Tab } from '@mui/material';
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
    const theme = useTheme();

    const surfaces = {
        bg: theme.palette.mode === 'dark' ? '#1f2128' : '#ffffff',
        panel: theme.palette.mode === 'dark' ? '#242731' : '#f0f2f5',
        border: theme.palette.mode === 'dark' ? '#2f3340' : '#e6e9f2',
        shadow: theme.palette.mode === 'dark' ? '0 16px 40px rgba(0,0,0,0.45)' : '0 12px 30px rgba(0,0,0,0.12)',
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: '100%',
                typography: 'body1',
                maxWidth: 480,
                mx: 'auto',
                mt: 3,
                borderRadius: 3,
                boxShadow: surfaces.shadow,
                background: surfaces.bg,
                border: `1px solid ${surfaces.border}`,
                overflow: 'hidden',
            }}
        >
            <TabContext value={value}>
                <Box
                    sx={{
                        px: 2,
                        pt: 2,
                        pb: 0.5,
                        borderBottom: `1px solid ${surfaces.border}`,
                        backgroundColor: surfaces.panel,
                    }}
                >
                    <TabList
                        onChange={handleChange}
                        aria-label="contact tabs"
                        textColor="primary"
                        indicatorColor="primary"
                        sx={{
                            '& .MuiTabs-indicator': { height: 3, borderRadius: 999 },
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontWeight: 600,
                                color: '#637381',
                                '&.Mui-selected': { color: '#1877f2' },
                            },
                        }}
                    >
                        <Tab label="Contacts" value="1" />
                        <Tab label="Search" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1" sx={{ px: 2, pb: 2 }}>
                    <ContactRequestComponent userId={userId} userRequests={userRequests} setUserRequests={setUserRequests} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                    <ContactsComponent data={userContacts} userId={userId} type={"contacts"} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                </TabPanel>
                <TabPanel value="2" sx={{ px: 2, pb: 2 }}>
                    <ContactRequestComponent userId={userId} userRequests={userRequests} setUserRequests={setUserRequests} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} loading={loading} setLoading={setLoading} />
                    <SearchComponent userId={userId} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} userSentRequests={userSentRequests} setUserSentRequests={setUserSentRequests} loading={loading} setLoading={setLoading} userContacts={userContacts} />
                </TabPanel>
            </TabContext>
            {loading && <SpinnerComponent />}
        </Box>
    );
};
