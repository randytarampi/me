exports.__esModule = true;

const path = require("path");

const reactRouterRoot = path.dirname(require.resolve("react-router/package.json"));
const reactRouterBuild = process.env.NODE_ENV === "development" ? "development" : "production";
const reactRouterDist = path.join(reactRouterRoot, "dist", reactRouterBuild);

const components = require(path.join(reactRouterDist, "lib/components.js"));
const hooks = require(path.join(reactRouterDist, "lib/hooks.js"));
const routerUtils = require(path.join(reactRouterDist, "lib/router/utils.js"));
const domServer = require(path.join(reactRouterDist, "lib/dom/server.js"));

exports.Router = components.Router;
exports.Route = components.Route;
exports.Routes = components.Routes;
exports.StaticRouter = domServer.StaticRouter;
exports.matchPath = routerUtils.matchPath;
exports.useLocation = hooks.useLocation;
exports.useParams = hooks.useParams;
