This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


### **  Folder Structure**

```
src/
 ├── app/
 │   ├── fonts/
 │   ├── globals.css
 │   ├── layout.js
 │   ├── page.js
 │   ├── api/        // Future API routes for backend
 │   ├── auth/       // Future Authentication components/pages
 │   ├── components/
 │   │    ├── Header.js  // Common Header for the app
 │   │    ├── Map.js     // Component for displaying map with live bus tracking
 │   │    ├── BusSearch.js // Search component (Source, Destination, Submit)
 │   ├── pages/
 │   │    ├── index.js   // Main page for source/destination search
 │   │    ├── search.js  // Page displaying search results, bus details, and live location
 ├── public/
 ├── next.config.js      // Next.js config (with PWA)
 ├── tailwind.config.js  // Tailwind CSS config
 ├── .eslintrc.json      // ESLint configuration
 ├── package.json
```
backend : accept the live req, with and 