// Import only what we need from @arcjet/next
import { createMiddleware } from "@arcjet/next";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Import our pre-configured Arcjet instance from lib
import aj from "./lib/arcjet";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/account(.*)",
  "/transaction(.*)",
]);


// Create base Clerk middleware
const clerk = clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
  }

  return NextResponse.next();
});

// Chain middlewares - ArcJet runs first, then Clerk
export default createMiddleware(aj, clerk);

export const config = {
  matcher: [
    // Only run middleware on specific routes that need protection
    "/dashboard/:path*",
    "/account/:path*",
    "/transaction/:path*",
    "/api/:path*",
  ],
};
