// message-app/netlify/functions/postQueryRequestsForUser.js

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const { userId } = await request.json();

    if (!userId) {
        return new Response(JSON.stringify({ error: 'Missing userId in request body' }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const contacts = await sql`
    SELECT 
        relations.id,
        relations.user1_id, 
        relations.user2_id,
        CASE 
            WHEN relations.user1_id = ${userId} THEN user2.username
            WHEN relations.user2_id = ${userId} THEN user1.username
        END as username
    FROM relations
    LEFT JOIN users as user1 ON relations.user1_id = user1.id
    LEFT JOIN users as user2 ON relations.user2_id = user2.id
    WHERE relations.user1_id = ${userId} OR relations.user2_id = ${userId}
    `;

    return new Response(JSON.stringify(contacts),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

}