import {expect} from "chai";
import {createPostCardOverlayClass} from "../../../../../src/lib/components/map/google/postCardOverlay.jsx";

describe("post card overlay adapter", function () {
    it("does not throw while Google Maps is still missing projection or anchor position", function () {
        const previousGoogle = globalThis.google;
        globalThis.google = {
            maps: {
                OverlayView: class {
                    getProjection() {
                        return null;
                    }
                }
            }
        };

        try {
            const Overlay = createPostCardOverlayClass();
            const overlay = new Overlay({anchor: {}, width: 100, height: 100});

            expect(() => overlay.draw()).not.to.throw();
        } finally {
            if (previousGoogle === undefined) {
                delete globalThis.google;
            } else {
                globalThis.google = previousGoogle;
            }
        }
    });
});
