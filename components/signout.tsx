"use client";

import React, { FC } from "react";
import { signOut } from "next-auth/react";

const SignOutComponent: FC = () => {
  async function onSignOut() {
    await signOut();
  }

  return (
    <button
      onClick={(e) => onSignOut()}
      type="button"
      className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
      Sign out
    </button>
  );
};

export default SignOutComponent;
