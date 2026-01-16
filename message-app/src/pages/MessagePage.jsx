import { useEffect, useState } from "react";

import NavBarComponent from "../components/NavBarComponent";
import MessageBoxComponent from "../components/MessageBoxComponent";
import { SwipeableDrawer, useMediaQuery } from "@mui/material";
import TabComponent from "../components/TabComponent";

import '../styles/MessagePage.css';

export default function MessagePage({
    userId, setUserId,
    username, setUsername,
    setLoggedIn,
    setOpenSnackbar, setSnackbarMessage, setLoading }) {
    const [userContacts, setUserContacts] = useState([]);
    const [userRequests, setUserRequests] = useState([]);
    const [userSentRequests, setUserSentRequests] = useState([]);
    const [messagesData, setMessagesData] = useState({
        currentUserId: userId,
        selectedContactId: null,
        conversations: [],
    });
    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width:768px)");

    useEffect(() => {
        if (!isMobile) {
            setDrawerOpen(false);
        }
    }, [isMobile]);

    useEffect(() => {
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
        //console.log("Changing chat to contact ID:", chatId[0] === userId ? chatId[1] : chatId[0]);
        setMessagesData(prevData => ({
            ...prevData,
            selectedContactId: chatId[0] === userId ? chatId[1] : chatId[0],
        }));

        fetch('/.netlify/functions/postQueryMessages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                senderId: userId,
                receiverId: chatId[0] === userId ? chatId[1] : chatId[0]
            }),
        })
            .then(res => res.json())
            .then(data => {
                //console.log("Fetched messages:", data);
                setMessagesData(prevData => ({
                    ...prevData,
                    conversations: [{
                        contactId: chatId[0] === userId ? chatId[1] : chatId[0], messages: data.map(msg => ({
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
        <div className="message-page-container">
            <NavBarComponent
                setLoggedIn={setLoggedIn}
                setUserId={setUserId}
                username={username}
                setUsername={setUsername}
                onMenuToggle={() => setDrawerOpen(true)}
                showMenuToggle={isMobile}
            />
            <div className="message-page-content">
                {isMobile && (
                    <SwipeableDrawer
                        anchor="left"
                        open={drawerOpen}
                        onOpen={() => setDrawerOpen(true)}
                        onClose={() => setDrawerOpen(false)}
                        disableDiscovery
                    >
                        <div className="drawer-content">
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
                    </SwipeableDrawer>
                )}

                {!isMobile && (
                    <div className="message-page-sidebar">
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
                )}
                <div className="message-page-main">
                    <MessageBoxComponent
                        data={messagesData}
                        setData={setMessagesData} />
                </div>
            </div>
        </div>
    )
}