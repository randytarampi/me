exports.__esModule = true;

const reactRouterBuild = process.env.NODE_ENV === "development" ? "development" : "production";
const reactRouterRoot = require.resolve("react-router/package.json").replace(/package\.json$/, "");
const reactRouterDist = `${reactRouterRoot}dist/${reactRouterBuild}`;

const components = require(`${reactRouterDist}/lib/components.js`);
const hooks = require(`${reactRouterDist}/lib/hooks.js`);
const routerUtils = require(`${reactRouterDist}/lib/router/utils.js`);
const domServer = require(`${reactRouterDist}/lib/dom/server.js`);

exports.Router = components.Router;
exports.Route = components.Route;
exports.Routes = components.Routes;
exports.StaticRouter = domServer.StaticRouter;
exports.matchPath = routerUtils.matchPath;
exports.useLocation = hooks.useLocation;
exports.useParams = hooks.useParams;
