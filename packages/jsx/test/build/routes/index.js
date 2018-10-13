import Error from "../../../src/lib/containers/error";
import Posts from "../../../src/lib/containers/posts";

const routes = [
    {
        component: Posts,
        path: "/"
    },
    {
        component: Error
    }
];

export default routes;
