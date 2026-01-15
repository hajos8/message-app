import React, { useEffect, useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import ContactsComponent from "./ContactsComponent";
import '../styles/Search.css';

export default function SearchComponent({ userId }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        fetch('/.netlify/functions/getAllUser')
            .then(async res => {
                const data = await res.json();
                console.log(data);
                setSearchResults(data);
            });
    }, []);

    const handleSearch = () => {
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
                <ContactsComponent data={searchResults} userId={userId} type={"search"} />
            </Box>
        </Box>
    );
}