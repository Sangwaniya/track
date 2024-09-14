import './globals.css';
import Header from './components/Header';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {/* Render Header globally */}
        <Header />
        {/* Render page-specific content */}
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
