import { Fragment, useEffect } from "react";

import NavBarComponent from "../components/NavBarComponent";
import ContactsComponent from "../components/ContactsComponent";
import MessageBoxComponent from "../components/MessageBoxComponent";

const messengerData = { // Dummy adatstruktúra az üzenetekhez
    currentUserId: 1,

    users: [
        {
            id: 1,
            name: "Te",
        },
        {
            id: 2,
            name: "Anna",
        },
        {
            id: 3,
            name: "Bence",
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

export default function MessagePage() {
    useEffect(() => {
        fetch("/api/get")
            .then(response => response.json())
            .then(data => {
                console.log("Fetched data:", data);
            })
            .catch(error => {
                console.log("Error fetching data:", error);
            });
    }, []);

    return (
        <div style={{ minHeight: "100vh", minWidth: "100vw" }}>
            <NavBarComponent />
            <div style={{ display: "flex" }}>
                <div style={{ width: "30%", borderRight: "1px solid #ccc" }}>
                    <ContactsComponent data={messengerData.users} />
                </div>
                <div style={{ width: "70%" }}>
                    <MessageBoxComponent currentUserId={messengerData.currentUserId} data={messengerData.conversations} />
                </div>
            </div>
        </div>
    )
}