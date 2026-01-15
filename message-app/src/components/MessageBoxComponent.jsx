import { TextField, Box, Icon, IconButton } from "@mui/material";
import "../styles/Messages.css";

export default function MessageBoxComponent({ data, setData }) {
    const [messageText, setMessageText] = useState("");

    const handleSendMessage = () => {
        fetch('/.netlify/functions/postSendMessage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderId: data.currentUserId,
                receiverId: data.selectedContactId,
                messageText: messageText
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log("Message sent:", data);
                setMessageText("");
            })
            .catch(error => {
                console.error("Error sending message:", error);
            });
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
                        <TextField
                            id="outlined"
                            placeholder="Type a message"
                            variant="outlined"
                            value={messageText}
                            onChange={(e) => setMessageText(e.target.value)}
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