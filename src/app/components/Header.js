import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-lg font-semibold">Bus Tracker</h1>
        <nav>
          <Link href="/">Home</Link>
        </nav>
      </div>
    </header>
  );
}
