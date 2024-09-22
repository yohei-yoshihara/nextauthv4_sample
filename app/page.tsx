import Image from "next/image";
import Link from "next/link";
import SignOutComponent from "@/components/signout";
import { Sign } from "crypto";

export default function Home() {
  return (
    <main className="container">
      <div className="w-full max-w-sm p-5">
        <h1 className="font-bold text-gray-500 text-2xl mb-3">Top Page</h1>
        <div className="m-1">
          <Link className="font-bold text-gray-700" href="/user">
            User Page
          </Link>
        </div>
        <div className="m-1">
          <Link className="font-bold text-gray-700" href="/admin">
            Admin Page
          </Link>
        </div>
        <div className="mt-3">
          <SignOutComponent />
        </div>
      </div>
    </main>
  );
}
