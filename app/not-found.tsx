import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>Ooops... Page not found!</h1>
      <Link href="/">
        <button>Go to Main</button>
      </Link>
    </div>
  );
}
