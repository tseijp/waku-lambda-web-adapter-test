import { Link } from "waku";

export default async function HomePage() {
  return (
    <div>
      <Link to="/" className="mt-4 inline-block underline">
        About page
      </Link>
    </div>
  );
}
