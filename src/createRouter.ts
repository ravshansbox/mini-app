import { match as createMatch } from 'path-to-regexp';
import { type Handler, type Route, type RouteWithMatch } from './types';

export const createRouter = () => {
  const routesWithMatch: RouteWithMatch[] = [];

  const addRoute = ({ method, path, handler }: Route) => {
    const match = path === undefined ? undefined : createMatch<Record<string, string>>(path);
    routesWithMatch.push({ method, path, match, handler });
  };

  return {
    routes: routesWithMatch,
    addRoute,
    addRoutes: (basePath: string, routes: Route[]) => {
      routes.map((route) => ({ ...route, path: `${basePath}${route.path}` })).forEach(addRoute);
    },
    get: (path: string, handler: Handler) => {
      addRoute({ method: 'GET', path, handler });
    },
    post: (path: string, handler: Handler) => {
      addRoute({ method: 'POST', path, handler });
    },
    put: (path: string, handler: Handler) => {
      addRoute({ method: 'PUT', path, handler });
    },
    delete: (path: string, handler: Handler) => {
      addRoute({ method: 'DELETE', path, handler });
    },
  };
};
