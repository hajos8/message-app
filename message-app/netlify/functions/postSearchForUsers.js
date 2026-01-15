// message-app/netlify/functions/postSearchForUsers.js

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { searchTerm } = await request.json();

    if (!searchTerm) {
        return new Response(JSON.stringify({ error: "Search term is required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const users = await sql`
  SELECT id, username FROM users WHERE username ILIKE ${'%' + searchTerm + '%'}
  `;

    console.log("Fetched users from database:", users);

    return new Response(JSON.stringify(users),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
}