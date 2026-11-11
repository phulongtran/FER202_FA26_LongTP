
import Link from 'next/link';

export default function Home() {
  return (
    <main className="py-20 text-center">
      <h1 className="text-4xl font-extrabold">
        Slot 20
      </h1>

      <Link
        href="/counter"
        className="mt-6 inline-block text-blue-600 underline"
      >
        Đến Counter →
      </Link>
    </main>
  );
}
