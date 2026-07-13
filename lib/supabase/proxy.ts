import { createServerClient } from '@supabase/ssr'
import {
  NextRequest,
  NextResponse,
} from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPA_URL!
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_ANON_PUBLIC_KEY!

const publicRoutes = [
  {path: '/login', whenAuthenticated: 'redirect',},
  {path: '/register', whenAuthenticated: 'redirect',},
  {path: '/about', whenAuthenticated: 'next',},
  {path: '/pricing', whenAuthenticated: 'next',},
] as const

const REDIRECT_LOGIN = '/login'
const REDIRECT_HOME = '/'

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({
    request,
  })

  const pathname =
    request.nextUrl.pathname

  const publicRoute =
    publicRoutes.find(
      (route) =>
        route.path === pathname
    )

  /**
   * Supabase SSR Client
   */
  const supabase =createServerClient(supabaseUrl, supabaseAnonKey,

      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },

          setAll(cookiesToSet) {
            cookiesToSet.forEach(
              ({
                name,
                value,
              }) =>
                request.cookies.set(
                  name,
                  value
                )
            )

            response =
              NextResponse.next({
                request,
              })

            cookiesToSet.forEach(
              ({
                name,
                value,
                options,
              }) =>
                response.cookies.set(
                  name,
                  value,
                  options
                )
            )
          },
        },
      }
    )

  /**
   * Valida usuário REAL
   */
  const {data: { user }} = await supabase.auth.getUser()

  const isAuthenticated = !!user

  /**
   * Usuário NÃO logado
   */
  if (!isAuthenticated) {
    /**
     * rota pública
     */
    if (publicRoute) {
      return response
    }

    /**
     * rota privada
     */
    const redirectUrl = request.nextUrl.clone()

    redirectUrl.pathname = REDIRECT_LOGIN

    return NextResponse.redirect(redirectUrl)
  }

  /**
   * Usuário logado
   */
  if (publicRoute) {
    /**
     * login/register
     */
    if (publicRoute.whenAuthenticated === 'redirect') {
      const redirectUrl = request.nextUrl.clone()

      redirectUrl.pathname = REDIRECT_HOME

      return NextResponse.redirect(redirectUrl)
    }
  }

  return response
}