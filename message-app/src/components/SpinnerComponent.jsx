import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import '../styles/Spinner.css'

export default function SpinnerComponent(props) {
    return (
        <Box className="spinner-container">
            <CircularProgress
                size={80}
                sx={{
                    color: '#646cff',
                }} />
        </Box>
    );
}