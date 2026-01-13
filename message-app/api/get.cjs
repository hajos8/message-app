import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export async function GET() {
    const users = await sql`
    SELECT id, name FROM users
  `;

    return Response.json(users);
}