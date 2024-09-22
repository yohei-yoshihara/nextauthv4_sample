import { FC } from "react";
import Link from "next/link";

const UserPage: FC = () => {
  return (
    <main className="container">
      <div className="w-full max-w-sm p-5">
        <h1 className="font-bold text-gray-500 text-2xl mb-3">User Page</h1>
        <div className="m-1">
          <Link className="font-bold text-gray-700" href="/">
            Back to Top Page
          </Link>
        </div>
      </div>
    </main>
  );
};

export default UserPage;
