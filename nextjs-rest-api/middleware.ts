import { NextResponse } from "next/server"

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://mysitedomain.com"]
    : ["http://localhost:3000"]

export function middleware(req: Request) {
  console.log("middleware")
  // const regexp = new RegExp("/api/todos", "i")
  // if(regexp.test(req.url)){

  // }

  const origin = req.headers.get("origin")
  console.log("req origin", origin)

  if (origin && allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    })
  }

  console.log("middleware")
  console.log("req.method", req.method)
  console.log("req.url", req.url)

  return NextResponse.next()
}

export const config = {
  matcher: "/api/todos/:path*",
}
