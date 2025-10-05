import { NextResponse, NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  console.log('MIDDLEWARE RUNNING:', req.nextUrl.pathname)
  
  const { pathname, searchParams } = req.nextUrl

  // Only protect admin routes
  if (!pathname.startsWith('/admin')) {
    console.log('Not admin route, allowing')
    return NextResponse.next()
  }

  console.log('Admin route detected:', pathname)

  // If a valid key is provided, set cookie and continue
  const key = searchParams.get('key')
  const token = process.env.ADMIN_TOKEN || 'ORANTIS_ADMIN_6f29c1e4a7b34f6b9d3a2'
  
  console.log('Checking auth:', { key, token: token ? 'SET' : 'NOT_SET' })
  
  if (key && token && key === token) {
    console.log('Valid token provided, setting cookie')
    const res = NextResponse.next()
    res.cookies.set('og_admin', '1', { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 })
    return res
  }

  // If already authorized, continue
  const cookie = req.cookies.get('og_admin')?.value
  if (cookie === '1') {
    console.log('Valid cookie found, allowing access')
    return NextResponse.next()
  }

  console.log('No valid auth, redirecting to login')
  // Otherwise, send to /admin/login (same URL base)
  const url = req.nextUrl.clone()
  url.pathname = '/admin/login'
  url.search = ''
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/admin/:path*'],
}
