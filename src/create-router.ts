import { match as createMatch } from 'path-to-regexp';
import { type Route, type RouteWithMatch } from './types';

export const createRouter = () => {
  const routesWithMatch: RouteWithMatch[] = [];

  const addRoute = ({ method, path, handler }: Route) => {
    const match = path === null ? null : createMatch<Record<string, string>>(path);
    routesWithMatch.push({ method, path, match, handler });
  };

  const addRoutes = (basePath: string, routes: Route[]) => {
    for (const { method, path, handler } of routes) {
      const fullPath = `${basePath}${path}`;
      const match = path === null ? null : createMatch<Record<string, string>>(fullPath);
      routesWithMatch.push({ method, path: fullPath, match, handler });
    }
  };

  return {
    routes: routesWithMatch,
    addRoute,
    addRoutes,
  };
};
