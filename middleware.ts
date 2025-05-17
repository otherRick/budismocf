import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verify } from 'jsonwebtoken';

// Adicione um console.log para verificar se o middleware está sendo executado
export async function middleware(request: NextRequest) {
  console.log('Middleware executando para:', request.nextUrl.pathname);

  // Verificar se a rota é admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    console.log('Rota admin detectada, verificando autenticação');

    // Obter token do cookie
    const token = request.cookies.get('admin_token')?.value;
    console.log('Token encontrado:', !!token);

    if (!token) {
      console.log('Sem token, redirecionando para login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      // Verificar JWT
      verify(token, process.env.JWT_SECRET || 'fallback_secret');
      console.log('Token válido, permitindo acesso');

      // Token válido, permitir acesso
      return NextResponse.next();
    } catch (error) {
      // Token inválido, redirecionar para login
      console.log('Token inválido, redirecionando para login', error);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// Certifique-se de que o matcher está correto
export const config = {
  matcher: ['/admin', '/admin/:path*']
};
