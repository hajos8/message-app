// message-app/netlify/functions/postSendMessage.js

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { senderId, receiverId, messageText } = await request.json();

    console.log("Received message send request:", { senderId, receiverId, messageText });

    if (!senderId || !receiverId || !messageText) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    const timestamp = new Date().toISOString();

    const insertedMessage = await sql`
        INSERT INTO messages (from_id, to_id, message, date)
        VALUES (${senderId}, ${receiverId}, ${messageText}, ${timestamp})
        RETURNING id, from_id, to_id, message, date;
    `;

    console.log("Inserted message into database:", insertedMessage);

    return new Response(JSON.stringify(insertedMessage[0]),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
}