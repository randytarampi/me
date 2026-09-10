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

    it("uses intrinsic sizing for text cards and transitions geometry", function () {
        const previousGoogle = globalThis.google;
        globalThis.google = {maps: {OverlayView: class {}}};

        try {
            const Overlay = createPostCardOverlayClass();
            const overlay = new Overlay({anchor: {}, width: 300, height: 144});
            overlay.getPanes = () => ({floatPane: document.createElement("div")});
            overlay.onAdd();

            expect(overlay.container.style.width).to.equal("");
            expect(overlay.container.style.height).to.equal("");
            expect(overlay.container.style.maxWidth).to.equal("75vw");
            expect(overlay.container.style.transition).to.contain("transform 250ms ease-out");
        } finally {
            if (previousGoogle === undefined) delete globalThis.google;
            else globalThis.google = previousGoogle;
        }
    });
});
