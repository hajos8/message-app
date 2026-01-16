// netlify/functions/register.js - POST - register for user

import { neon } from '@neondatabase/serverless';
import bcrypt from 'bcrypt';

const sql = neon(process.env.DATABASE_URL);


export default async (request, context) => {
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: "Method not allowed" }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
        return new Response(JSON.stringify({ error: "Username, email and password are required" }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const existingUsername = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (existingUsername.length > 0) {
        return new Response(JSON.stringify({ error: "Email already in use" }), {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const existingEmail = await sql`SELECT * FROM users WHERE username = ${username}`;

    if (existingEmail.length > 0) {
        return new Response(JSON.stringify({ error: "Username already in use" }), {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashedPassword}) RETURNING id, username, email`;

    console.log("New user registered:", newUser[0]);

    return new Response(JSON.stringify("User registered successfully"),
        {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });


}