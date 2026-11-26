import { NextResponse, type NextRequest } from "next/server";
import { adminEnabled, isAdminAuthorized } from "@/lib/admin-auth";

/** Password-protect the private admin area with HTTP Basic auth. */
export function proxy(request: NextRequest) {
  // With no password configured the admin area does not exist.
  if (!adminEnabled()) return new NextResponse("Not found", { status: 404 });

  if (isAdminAuthorized(request.headers.get("authorization"))) return NextResponse.next();

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="MedicoreERP admin", charset="UTF-8"' },
  });
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
