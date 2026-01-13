// netlify/functions/login.js - POST - login for user

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

const sql = neon(process.env.DATABASE_URL);

export default async (request, context) => {
    console.log(context);

    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { email, password } = await request.json();

    if (!email || !password) {
        return new Response(JSON.stringify({ error: "Email and password are required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const users = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (users.length === 0) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const user = users[0];
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
        return new Response(JSON.stringify({ error: "Invalid credentials" }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    console.log("User logged in:", user.email);

    return new Response(JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
    }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
}