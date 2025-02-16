import { NextRequest, NextResponse } from "next/server";

let count=0
export const GET = async (req: NextRequest) => {
  if (req.nextUrl.pathname === "/api/secret") {
    // Use new URL to create absolute URL for redirection
    const url = new URL('/verify', req.url)
    return NextResponse.redirect(url)
  }
  count++;
  
  console.log(`count from middleware: ${count}`) 
  return NextResponse.next()
}

// Matcher should match the exact paths you want to handle
export const config = {
  matcher: [
    '/api/:path*'
  ]
}