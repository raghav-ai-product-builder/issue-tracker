# Issue Tracker

A Next.js application for tracking issues with Prisma and PostgreSQL (Supabase).

## Environment Variables

Make sure to set the following environment variable in Vercel:

- `DATABASE_URL`: Your PostgreSQL database connection string (from Supabase)

Example format:

```
DATABASE_URL="postgresql://user:password@host:5432/database_name?sslmode=require"
```

## Setting up Supabase

1. Go to https://supabase.com and sign up/login
2. Create a new project
3. Go to Project Settings → Database
4. Copy the "Connection string" under "Connection parameters" (use the "URI" format)
5. Add it to Vercel as `DATABASE_URL` environment variable
6. Run the migration SQL:
   - Go to Supabase Dashboard → SQL Editor
   - Copy and paste the contents of `prisma/migrations/init/migration.sql`
   - Run the SQL to create the tables
7. Update your local `.env` file with the Supabase connection string for local development

## Vercel Deployment

1. Make sure `DATABASE_URL` is set in your Vercel project settings
2. The build process will automatically run `prisma generate` during build
3. Ensure your database is accessible from Vercel's servers

## Local Development

1. Copy `.env.example` to `.env` (if it exists) or create `.env` file
2. Add your `DATABASE_URL`
3. Run `npm install`
4. Run `npx prisma generate`
5. Run `npm run dev`
