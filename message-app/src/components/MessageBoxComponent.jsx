import { TextField, Box, Icon, IconButton } from "@mui/material";
import "../styles/Messages.css";

export default function MessageBoxComponent({ data, setData }) {
    const handleSendMessage = () => {
        //TODO implement send message functionality
        console.log("Send message clicked");
    }

    return (
        <Box className="message-box-container">
            {data.selectedContactId ?
                <>
                    <Box className="message-box">
                        {data.conversations.length != 0 ? data[0].messages.map((elem, idx) => {
                            return (
                                <Box key={idx} className={elem.senderId == data.currentUserId ? "sent message" : "received message"}>
                                    <p>{elem.text}</p>
                                    <span className="timestamp">{elem.timestamp}</span>
                                </Box>
                            )
                        })
                            : <p>Start a conversation</p>}
                    </Box>
                    <Box className="input-box">
                        <TextField id="outlined" placeholder="Type a message" variant="outlined"
                            sx={
                                { width: '100%', margin: '10px', borderRadius: '50%' }
                            } />
                        <IconButton onClick={handleSendMessage} sx={{ marginRight: '10px' }}>
                            <Icon>send</Icon>
                        </IconButton>
                    </Box>
                </>
                :
                <Box className="no-contact-selected">
                    <p>Select a contact to start a conversation</p>
                </Box>
            }
        </Box>
    )
}