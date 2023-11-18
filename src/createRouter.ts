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
    addRoute(route: Route) {
      addRoute(route);
      return this;
    },
    addRoutes(basePath: string, routes: Route[]) {
      routes.map((route) => ({ ...route, path: `${basePath}${route.path}` })).forEach(addRoute);
      return this;
    },
    get(path: string, handler: Handler) {
      addRoute({ method: 'GET', path, handler });
      return this;
    },
    post(path: string, handler: Handler) {
      addRoute({ method: 'POST', path, handler });
      return this;
    },
    put(path: string, handler: Handler) {
      addRoute({ method: 'PUT', path, handler });
      return this;
    },
    delete(path: string, handler: Handler) {
      addRoute({ method: 'DELETE', path, handler });
      return this;
    },
  };
};
