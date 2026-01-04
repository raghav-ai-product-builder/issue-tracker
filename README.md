# Issue Tracker

A Next.js application for tracking issues with Prisma and MySQL.

## Environment Variables

Make sure to set the following environment variable in Vercel:

- `DATABASE_URL`: Your MySQL database connection string

Example format:

```
DATABASE_URL="mysql://user:password@host:3306/database_name"
```

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
