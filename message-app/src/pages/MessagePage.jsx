import { Fragment, useEffect, useState } from "react";

import NavBarComponent from "../components/NavBarComponent";
import ContactsComponent from "../components/ContactsComponent";
import MessageBoxComponent from "../components/MessageBoxComponent";
import TabComponent from "../components/TabComponent";

const messengerData = { // Dummy adatstruktúra az üzenetekhez
    currentUserId: 1,

    users: [
        {
            id: 1,
            username: "Te",
        },
        {
            id: 2,
            username: "Anna",
        },
        {
            id: 3,
            username: "Bence",
        }
    ],

    conversations: [
        {
            id: "conv-1",
            messages: [
                {
                    id: "msg-1",
                    senderId: 2,
                    text: "Szia! 😊",
                    timestamp: "2026-01-05T18:30:00",
                },
                {
                    id: "msg-2",
                    senderId: 1,
                    text: "Szia! Mi újság?",
                    timestamp: "2026-01-05T18:31:10",
                },
                {
                    id: "msg-3",
                    senderId: 2,
                    text: "Tanulok, te?",
                    timestamp: "2026-01-05T18:32:45",
                }
            ]
        },

        {
            id: "conv-2",
            messages: [
                {
                    id: "msg-4",
                    senderId: 1,
                    text: "Jössz ma edzésre?",
                    timestamp: "2026-01-04T16:10:00",
                },
                {
                    id: "msg-5",
                    senderId: 3,
                    text: "Nem biztos 😕",
                    timestamp: "2026-01-04T16:12:00",
                },
                {
                    id: "msg-6",
                    senderId: 1,
                    text: "Oké, majd szólj!",
                    timestamp: "2026-01-04T16:13:20",
                }
            ]
        }
    ]
};

export default function MessagePage({ userId, username, setOpenSnackbar, setSnackbarMessage, setLoading }) {
    const [userContacts, setUserContacts] = useState([]);
    const [userRequests, setUserRequests] = useState([]);
    const [userSentRequests, setUserSentRequests] = useState([]);

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

                    console.log(data);
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
                    />
                </div>
                <div style={{ width: "70%" }}>
                    <MessageBoxComponent
                        currentUserId={messengerData.currentUserId}
                        data={messengerData.conversations} />
                </div>
            </div>
        </div>
    )
}