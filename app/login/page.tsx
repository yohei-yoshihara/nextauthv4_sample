"use client";

import { signIn, useSession, SessionProvider } from "next-auth/react";
import { FC, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const inputs = z.object({
  username: z
    .string({ message: "Username must not be empty" })
    .min(2, { message: "Username must be at least 2 characters" }),
  password: z
    .string({ message: "Password must not be empty" })
    .min(8, { message: "Password must be at least 8 characters" }),
});

type InputType = z.infer<typeof inputs>;

const SignInPage: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(inputs),
  });

  const router = useRouter();
  const onSubmit: SubmitHandler<InputType> = async (e) => {
    const result = await signIn("credentials", {
      username: watch("username"),
      password: watch("password"),
      callbackUrl: callbackUrl,
      redirect: false,
    });
    if (result?.error) {
      console.log("login error, error = ", result);
      setError("failed to login");
      return;
    }
    router.push(callbackUrl);
  };

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const { data: session, status } = useSession();

  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <SessionProvider>
        {status === "authenticated" ? (
          <p className="text-center">You are already signed in.</p>
        ) : (
          <span></span>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm border border-gray-300 shadow rounded-xl m-3 p-3">
          <div className="flex items-center">
            <div className="w-1/3">
              <label
                className="block text-gray-500 font-bold text-right mr-3"
                htmlFor="username">
                User Name
              </label>
            </div>
            <div className="w-2/3">
              <input
                className="block w-full appearance-none border-2 bg-gray-200 rounded focus:outline-none focus:border-gray-500 px-4 py-2"
                type="text"
                id="username"
                {...register("username")}></input>
            </div>
          </div>
          <div className="mb-6">
            {errors.username?.message && (
              <p className="text-red-400">{errors.username?.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <div className="w-1/3">
              <label
                className="block text-gray-500 font-bold text-right mr-3"
                htmlFor="password">
                Password
              </label>
            </div>
            <div className="w-2/3">
              <input
                className="block w-full appearance-none border-2 bg-gray-200 rounded focus:outline-none focus:border-gray-500 px-4 py-2"
                type="password"
                id="password"
                {...register("password")}></input>
            </div>
          </div>
          <div className="mb-6">
            {errors.password?.message && (
              <p className="text-red-400">{errors.password?.message}</p>
            )}
          </div>
          <div className="flex items-center">
            <div className="w-1/3"></div>
            <div className="w-2/3">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl border px-4 py-2">
                Sign up
              </button>
            </div>
          </div>
          {error ? (
            <div className="flex items-center mt-3">
              <div className="w-1/3"></div>
              <div className="w-2/3 text-red-400">
                <p>{error}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </form>

        <table className="mt-10">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Password</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">user1</th>
              <td>password</td>
              <td>user</td>
            </tr>
            <tr>
              <th scope="row">user2</th>
              <td>password</td>
              <td>user</td>
            </tr>
            <tr>
              <th scope="row">admin</th>
              <td>password</td>
              <td>admin</td>
            </tr>
          </tbody>
        </table>
      </SessionProvider>
    </>
  );
};

export default SignInPage;
