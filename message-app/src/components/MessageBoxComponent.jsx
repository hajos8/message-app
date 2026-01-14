import { TextField, Box } from "@mui/material";
import "../styles/Messages.css";

export default function MessageBoxComponent({ data, currentUserId }) {
    return (
        <Box className="message-box-container">
            <Box className="message-box">
                {data[0].messages.map((elem, idx) => {
                    return (
                        <Box key={idx} className={elem.senderId == currentUserId ? "sent message" : "received message"}>
                            <p>{elem.text}</p>
                            <span className="timestamp">{elem.timestamp}</span>
                        </Box>
                    )
                })}
            </Box>
            <TextField id="outlined" placeholder="Type a message" variant="outlined"
                sx={
                    { width: '100%', margin: '10px', borderRadius: '50%' }
                } />
        </Box>
    )
}