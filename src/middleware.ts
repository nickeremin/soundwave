import { NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: [
    "/",
    "/search",
    "/not-auth",
    "/signin(.*)",
    "/signup(.*)",
    "/sso-callback(.*)",
    "/verification(.*)",
    "/api/trpc(.*)",
  ],
  async afterAuth(auth, req) {
    if (auth.isPublicRoute) {
      //  For public routes, we don't need to do anything
      return NextResponse.next()
    }

    if (!auth.userId) {
      //  If user tries to access a private route without being authenticated,
      //  redirect them to the sign in page
      const redirect = req.nextUrl.pathname

      const url = new URL(req.nextUrl.origin)
      url.pathname = "/signin"
      url.searchParams.set("redirect", redirect)

      return NextResponse.redirect(url)
    }
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
