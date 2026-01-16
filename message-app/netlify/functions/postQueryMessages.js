// message-app/netlify/functions/postQueryMessages.js

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { senderId, receiverId } = await request.json();

    if (!senderId || !receiverId) {
        return new Response(JSON.stringify({ error: "Missing required fields" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const messages = await sql`
        SELECT id, from_id, to_id, message, date
        FROM messages
        WHERE (from_id = ${senderId} AND to_id = ${receiverId})
           OR (from_id = ${receiverId} AND to_id = ${senderId})
        ORDER BY date ASC;
    `;

    console.log(`Fetched ${messages.length} messages between users ${senderId} and ${receiverId}.`);

    return new Response(JSON.stringify(messages),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
}