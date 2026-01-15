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
    SELECT user1_id, user2_id FROM requests WHERE user1_id = ${userId} OR user2_id = ${userId}
    `;

    return new Response(JSON.stringify(contacts),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });

}