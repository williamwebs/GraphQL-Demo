## QraphQL Api Demo
This is just a demo code to perform basic mutation and query functions in GraphQL.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First clone the repository using:

```bash
git clone [url]
```
Install the dependencies using: 

```bash
npm install
# or 
pnpm install
```

then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

There are 2 other pages aside the  `app/pages.tsx` which include mutation codes: `app/mutation/page.tsx` and character(for query): `app/character/page.tsx`.

### Note:
To successfully get a response from the character and home page, edit the GraphQL uri in the `provider/AppProvider.tsx` to use the second uri. The first uri only works for the mutation page.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

