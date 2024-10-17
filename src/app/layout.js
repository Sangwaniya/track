import React from 'react';
import Header from './components/Header';
import './globals.css'; // Assuming you have global styles here

export const metadata = {
  title: 'Bus Live Tracking App',
  description: 'Track buses in real-time with our live tracking system',
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* You can add more meta tags here */}
        <link rel="icon" href="/favicon.ico" />
        <title>{metadata.title}</title>
      </head>
      <body>
        <Header />
        <main className="p-4">
          {children}
        </main>
      </body>
    </html>
  );
}
