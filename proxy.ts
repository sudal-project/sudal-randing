import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function isAuthorized(request: NextRequest) {
  const adminSecret = process.env.ADMIN_SECRET;
  const authHeader = request.headers.get("authorization");

  if (!adminSecret || !authHeader?.startsWith("Basic ")) {
    return false;
  }

  const decoded = atob(authHeader.slice("Basic ".length));
  const password = decoded.slice(decoded.indexOf(":") + 1);

  return password === adminSecret;
}

export function proxy(request: NextRequest) {
  if (isAuthorized(request)) {
    return NextResponse.next();
  }

  return new NextResponse("인증이 필요해요.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="admin"' },
  });
}

export const config = {
  matcher: "/admin/:path*",
};
