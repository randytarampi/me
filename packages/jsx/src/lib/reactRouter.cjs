exports.__esModule = true;
const path = require("path");

const reactRouterDomPackagePath = require.resolve("react-router-dom/package.json");
const reactRouterPath = require.resolve("react-router", {
    paths: [path.dirname(reactRouterDomPackagePath)]
});

const reactRouter = require(reactRouterPath);

exports.Router = reactRouter.Router;
exports.Route = reactRouter.Route;
exports.Routes = reactRouter.Routes;
exports.StaticRouter = reactRouter.StaticRouter;
exports.matchPath = reactRouter.matchPath;
exports.useLocation = reactRouter.useLocation;
exports.useParams = reactRouter.useParams;
