import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <p className="eyebrow">A quiet pause</p>
      <h1>This path does not continue.</h1>
      <p>The page you were looking for could not be found.</p>
      <Link href="/" className="button button-primary">
        Return home
      </Link>
    </main>
  );
}
