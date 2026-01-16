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
    SELECT 
        requests.id,
        requests.from_id, 
        requests.to_id,
        COALESCE(from_user.username, to_user.username) as username,
        CASE 
            WHEN requests.to_id = ${userId} THEN from_user.username
            WHEN requests.from_id = ${userId} THEN to_user.username
        END as sender_username
    FROM requests
    LEFT JOIN users as from_user ON requests.from_id = from_user.id
    LEFT JOIN users as to_user ON requests.to_id = to_user.id
    WHERE requests.from_id = ${userId} OR requests.to_id = ${userId}
    `;

    return new Response(JSON.stringify(requests),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
}