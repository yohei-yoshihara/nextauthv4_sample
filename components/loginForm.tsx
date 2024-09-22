"use client";

import React, { FC } from "react";

const LoginForm: FC = () => {
  return (
    <>
      <form className="w-full max-w-sm border border-gray-400 shadow m-3 p-3">
        <div className="flex items-center mb-3">
          <div className="w-1/3">
            <label className="font-bold text-gray-500">Username</label>
          </div>
          <div className="w-2/3">
            <input className="w-full appearance-none focus:outline-none focus:outline-gray-500"></input>
          </div>
        </div>

        <div className="flex items-center mb-3">
          <div className="w-1/3">
            <label className="font-bold text-gray-500">Password</label>
          </div>
          <div className="w-2/3">
            <input className="w-full"></input>
          </div>
        </div>

        <div className="flex items-center">
          <div className="w-1/3"></div>
          <div className="w-2/3">
            <button>Sign up</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
