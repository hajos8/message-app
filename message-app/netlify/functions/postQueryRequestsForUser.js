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

    const requests = await sql`
    SELECT from_id, to_id FROM requests WHERE from_id = ${userId} OR to_id = ${userId}
    `;

    return new Response(JSON.stringify(requests),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
}