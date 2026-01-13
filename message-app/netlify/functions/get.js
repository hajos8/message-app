// message-app/netlify/functions/get.js - for testing database connection

import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {
  const users = await sql`
  SELECT * FROM users
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