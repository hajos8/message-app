// message-app/netlify/functions/getAllUser.js

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {
  const users = await sql`
  SELECT username FROM users
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