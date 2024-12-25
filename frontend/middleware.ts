import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export default clerkMiddleware(() => {
  return NextResponse.next();
});

export const config = {
  matcher: ["/chat/:path*"], // Protect the `/chat` route and its subpaths
};
