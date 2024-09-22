// export { default } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth((req: NextRequestWithAuth) => {
  const pathname = req.nextUrl.pathname;
  console.log("pathname = ", pathname);
  console.log("token = ", req.nextauth.token);

  if (pathname.startsWith("/admin") && req.nextauth.token?.role !== "admin") {
    return NextResponse.rewrite(new URL("/404", req.url));
  }
});

export const config = {
  matcher:
    "/((?!api|api/auth/signin|login|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
