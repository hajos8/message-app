import { Fragment, useEffect, useState } from "react";

import NavBarComponent from "../components/NavBarComponent";
import ContactsComponent from "../components/ContactsComponent";
import MessageBoxComponent from "../components/MessageBoxComponent";
import TabComponent from "../components/TabComponent";

export default function MessagePage({ userId, username, setOpenSnackbar, setSnackbarMessage, setLoading }) {
    const [userContacts, setUserContacts] = useState([]);
    const [userRequests, setUserRequests] = useState([]);
    const [userSentRequests, setUserSentRequests] = useState([]);
    const [messagesData, setMessagesData] = useState({
        currentUserId: userId,
        selectedContactId: null,
        conversations: [],
    });

    useEffect(() => {
        //TODO fetch user contacts, requests and sent requests from backend
        function fetchUserContacts() {
            fetch('/.netlify/functions/postQueryUserContacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId }),
            })
                .then(res => res.json())
                .then(data => {
                    setUserContacts(data);
                }
                )
                .catch(error => {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Error fetching user contacts');
                });
        }
        function fetchUserRequests() {
            fetch('/.netlify/functions/postQueryRequestsForUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId }),
            })
                .then(res => res.json())
                .then(data => {
                    const requestsForUser = data.filter(req => req.to_id === userId).map(req => ({ from_id: req.from_id, username: req.sender_username }));
                    const sentRequests = data.filter(req => req.from_id === userId).map(req => req.to_id);
                    setUserRequests(requestsForUser);
                    setUserSentRequests(sentRequests);
                }
                )
                .catch(error => {
                    setOpenSnackbar(true);
                    setSnackbarMessage('Error fetching user requests');
                });
        }

        setLoading(true);

        Promise.all([fetchUserRequests(), fetchUserContacts()]).finally(() => {
            setLoading(false);
        });
    }, [userId, setOpenSnackbar, setSnackbarMessage, setLoading]);

    const handleChangeChat = (chatId) => {
        console.log("Changing chat to contact ID:", chatId);
        setMessagesData(prevData => ({
            ...prevData,
            selectedContactId: chatId,
        }));

        fetch('/.netlify/functions/postQueryMessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderId: userId,
                receiverId: chatId
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log("Fetched messages:", data);
                setMessagesData(prevData => ({
                    ...prevData,
                    conversations: [{
                        contactId: chatId, messages: data.map(msg => ({
                            id: msg.id,
                            senderId: msg.from_id,
                            receiverId: msg.to_id,
                            text: msg.message,
                            timestamp: msg.date
                        }))
                    }]
                }));
            })
            .catch(error => {
                setOpenSnackbar(true);
                setSnackbarMessage('Error fetching messages for selected chat');
            })
            .finally(() => {
                //setLoading(false);
            });
    }

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <NavBarComponent />
            <div style={{ display: "flex" }}>
                <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
                    <TabComponent
                        userContacts={userContacts}
                        userRequests={userRequests}
                        setUserRequests={setUserRequests}
                        userSentRequests={userSentRequests}
                        setUserSentRequests={setUserSentRequests}
                        userId={userId}
                        setOpenSnackbar={setOpenSnackbar}
                        setSnackbarMessage={setSnackbarMessage}
                        handleChangeChat={handleChangeChat}
                    />
                </div>
                <div style={{ width: "70%" }}>
                    <MessageBoxComponent
                        data={messagesData}
                        setData={setMessagesData} />
                </div>
            </div>
        </div>
    )
}