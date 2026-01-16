import { TextField, Box, IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import "../styles/Messages.css";

export default function MessageBoxComponent({ data, setData }) {
    const [messageText, setMessageText] = useState("");

    const formatTimestamp = (value) => {
        if (!value) return "";
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return new Intl.DateTimeFormat(undefined, {
            dateStyle: "medium",
            timeStyle: "short",
        }).format(date);
    };

    const currentConversation = data.conversations.find(conv => conv.contactId === data.selectedContactId);
    const messages = currentConversation?.messages ?? [];

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
                //console.log("Message sent:", data);
                setMessageText("");
                // Update messages in state
                setData(prevData => {
                    const updatedConversations = prevData.conversations.map(conv => {
                        if (conv.contactId === prevData.selectedContactId) {
                            return {
                                ...conv,
                                messages: [...conv.messages, {
                                    id: data.id,
                                    senderId: data.from_id,
                                    receiverId: data.to_id,
                                    text: data.message,
                                    timestamp: data.date
                                }]
                            };
                        }
                        return conv;
                    });
                    return {
                        ...prevData,
                        conversations: updatedConversations
                    };
                });
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
                        {messages.length !== 0 ? messages.map((elem, idx) => {
                            return (
                                <Box key={elem.id ?? idx} className={elem.senderId === data.currentUserId ? "sent message" : "received message"}>
                                    <p>{elem.text}</p>
                                    <span className="timestamp">{formatTimestamp(elem.timestamp)}</span>
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
                            sx={{ width: '100%', margin: '10px', borderRadius: '50%' }}
                        />
                        <IconButton
                            onClick={handleSendMessage}
                            sx={{
                                marginRight: '10px',
                                backgroundColor: 'var(--accent)',
                                color: '#fff',
                                '&:hover': { backgroundColor: 'var(--accent-strong)' },
                            }}
                        >
                            <SendIcon />
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