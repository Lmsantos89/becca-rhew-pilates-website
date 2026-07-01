import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // exclude api, _next, studio, and static files from locale routing
  matcher: ['/((?!api|_next|studio|.*\\..*).*)'],
};
