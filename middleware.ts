import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Adicione um console.log para verificar se o middleware está sendo executado
export async function middleware(request: NextRequest) {
  console.log('Middleware executando para:', request.nextUrl.pathname);

  // Comentando a verificação da rota admin, pois já é feita no getServerSideProps
  // if (request.nextUrl.pathname.startsWith('/admin')) {
  //   console.log('Rota admin detectada, verificando autenticação');
  //   ...
  // }

  return NextResponse.next();
}

// Atualizando o matcher para não incluir as rotas admin
export const config = {
  matcher: [] // Removendo '/admin' e '/admin/:path*' do matcher
};
