import {createRequire} from "module";

const require = createRequire(import.meta.url);

const {expect} = require("chai");
const {
    matchRouteForPathname,
    selectMatchedUnswipeableRoutes
} = require("../../../../../src/lib/util/renderSwipeableRoutes.jsx");

describe("renderSwipeableRoutes", function () {
    describe("matchRouteForPathname", function () {
        it("prefix-matches non-exact routes the way react-router@5 did", function () {
            expect(matchRouteForPathname({path: "/resume"}, "/resume")).to.not.eql(null);
            expect(matchRouteForPathname({path: "/resume"}, "/resume/variant")).to.not.eql(null);
            expect(matchRouteForPathname({path: "/resume"}, "/letter")).to.eql(null);
        });

        it("honours exact routes", function () {
            expect(matchRouteForPathname({path: "/", exact: true}, "/")).to.not.eql(null);
            expect(matchRouteForPathname({path: "/", exact: true}, "/resume")).to.eql(null);
        });
    });

    describe("selectMatchedUnswipeableRoutes", function () {
        const routes = [
            {path: "/", exact: true, tab: true, key: "home"},
            {path: "/blog", tab: true, key: "blog"},
            {path: "/resume", tab: true, key: "resume"},
            {path: "/photos", key: "photos-redirect"},
            {key: "error-404"}
        ];

        it("does not mount a pathless catch-all under a matched swipeable page", function () {
            expect(selectMatchedUnswipeableRoutes(routes, "/resume").map(route => route.key)).to.eql([]);
            expect(selectMatchedUnswipeableRoutes(routes, "/blog").map(route => route.key)).to.eql([]);
            expect(selectMatchedUnswipeableRoutes(routes, "/").map(route => route.key)).to.eql([]);
        });

        it("mounts a pathless catch-all only when nothing else matched", function () {
            expect(selectMatchedUnswipeableRoutes(routes, "/nope").map(route => route.key)).to.eql(["error-404"]);
        });

        it("mounts non-tab path routes when they are the first match", function () {
            expect(selectMatchedUnswipeableRoutes(routes, "/photos").map(route => route.key)).to.eql(["photos-redirect"]);
        });
    });
});
