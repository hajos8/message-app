import React, { useEffect, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ContactsComponent from "./ContactsComponent";
import '../styles/Search.css';

export default function SearchComponent({
    userId,
    setOpenSnackbar, setSnackbarMessage,
    userSentRequests, setUserSentRequests,
    userContacts,
    loading, setLoading }) {
    const [allUsers, setAllUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        setLoading(true);
        fetch('/.netlify/functions/getAllUser')
            .then(async res => {
                const data = await res.json();
                console.log(data);
                setAllUsers(data);
                setSearchResults(data);
            })
            .catch(error => {
                console.error('Error fetching all users:', error);
                setOpenSnackbar(true);
                setSnackbarMessage('Error fetching users');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleSearch = () => {
        if (searchTerm.trim() === "") {
            setSearchResults(allUsers);
            return;
        }
        setLoading(true);
        fetch('/.netlify/functions/postSearchForUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchTerm }),
        })
            .then(async res => {
                const data = await res.json();
                console.log(data);
                setSearchResults(data);
            })
            .catch(error => {
                console.error('Error searching for users:', error);
                setOpenSnackbar(true);
                setSnackbarMessage('Error searching for users');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Box className="search-container">
            <Box className="search-box">
                <TextField
                    id="outlined-search"
                    type="search"
                    size="small"
                    fullWidth
                    placeholder="Search for users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant="standard"
                />
                <IconButton aria-label="search" className="search-button" size="small" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
            </Box>

            <Box className="results-container">
                <ContactsComponent data={searchResults} userContacts={userContacts} userId={userId} type={"search"} userSentRequests={userSentRequests} setUserSentRequests={setUserSentRequests} setOpenSnackbar={setOpenSnackbar} setSnackbarMessage={setSnackbarMessage} />
            </Box>
        </Box>
    );
}