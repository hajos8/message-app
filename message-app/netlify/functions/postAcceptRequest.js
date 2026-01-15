// message-app/netlify/functions/postAcceptRequest.js - POST accept friend request

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

    // check if the friend request exists
    const existingRequest = await sql`
        SELECT id FROM requests WHERE from_id = ${fromUserId} AND to_id = ${toUserId}
    `;

    if (existingRequest.length === 0) {
        return new Response(JSON.stringify({ error: "Friend request not found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Delete the request from requests table
    await sql`
        DELETE FROM requests WHERE from_id = ${fromUserId} AND to_id = ${toUserId}
    `;

    // Add to relations table
    const newContact = await sql`
        INSERT INTO relations (user1_id, user2_id) 
        VALUES (${fromUserId}, ${toUserId}) 
        RETURNING id, user1_id, user2_id
    `;

    console.log("Friend request accepted:", newContact[0]);

    if (!newContact[0]) {
        return new Response(JSON.stringify({ error: "Failed to accept friend request" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({
        message: "Friend request accepted successfully",
        contact: newContact[0]
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });

}
