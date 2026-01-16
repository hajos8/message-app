// message-app/netlify/functions/postNewRequest.js - POST new friend request

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { fromUserId, toUserId } = await request.json();

    if (!fromUserId || !toUserId) {
        return new Response(JSON.stringify({ error: "Both fromUserId and toUserId are required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const newRequest = await sql`INSERT INTO requests (from_id, to_id) VALUES (${fromUserId}, ${toUserId}) RETURNING id, from_id, to_id`;

    console.log("New friend request created:", newRequest[0]);

    if (!newRequest[0]) {
        return new Response(JSON.stringify({ error: "Failed to create friend request" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify("Friend request sent successfully"),
        {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });

}