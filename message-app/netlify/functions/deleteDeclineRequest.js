// message-app/netlify/functions/deleteDeclineRequest.js - DELETE decline friend request

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {

    if (request.method !== 'DELETE' && request.method !== 'POST') {
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

    // Check if the friend request exists
    const existingRequest = await sql`
        SELECT id FROM requests WHERE from_id = ${fromUserId} AND to_id = ${toUserId}
    `;

    if (existingRequest.length === 0) {
        return new Response(JSON.stringify({ error: "Friend request not found" }), {
            status: 404,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    // Delete the request
    const deletedRequest = await sql`
        DELETE FROM requests 
        WHERE from_id = ${fromUserId} AND to_id = ${toUserId}
        RETURNING id
    `;

    console.log("Friend request declined:", deletedRequest[0]);

    if (!deletedRequest[0]) {
        return new Response(JSON.stringify({ error: "Failed to decline friend request" }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify({
        message: "Friend request declined successfully"
    }), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });

}
