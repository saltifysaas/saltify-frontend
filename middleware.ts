import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const parts = hostname.split(".");
  const subdomain =
    parts.length > 2 ? parts[0] : ""; // phillips.saltifysaas.com => "phillips"

  console.log("✅ Middleware Subdomain:", subdomain);

  // Example: you could block login on main domain if needed
  if (hostname === "app.saltifysaas.com" && request.nextUrl.pathname.startsWith("/login")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Optionally, you can pass subdomain to your pages via header or cookie if needed
  const response = NextResponse.next();
  response.headers.set("x-subdomain", subdomain);

  return response;
}

export const config = {
  matcher: ["/((?!_next).*)"], // run for all paths except _next/static
};
