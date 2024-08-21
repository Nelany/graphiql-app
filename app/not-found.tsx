import Link from 'next/link';

export default function NotFound() {
  // throw new Error("This is a test error");

  return (
    <div>
      <h1>Ooops... Page not found!</h1>
      <Link href="/">
        <button>Go to Main</button>
      </Link>
    </div>
  );
}
