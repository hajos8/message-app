import React from 'react';
import { Box, TextField } from '@mui/material';

export default function SearchComponent() {
    return (
        <Box>
            <TextField id="outlined-search" label="Search field" type="search" />
        </Box>
    );
}