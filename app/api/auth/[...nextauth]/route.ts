import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "user1" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials) {
          return null;
        }
        const user = await db.user.findUnique({
          where: {
            username: credentials.username,
          },
        });
        if (!user) {
          return null;
        }
        if (!bcrypt.compare(credentials.password, user.password)) {
          return null;
        }
        return {
          id: `${user.id}`,
          name: user.username,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
