import {expect} from "chai";
import sinon from "sinon";
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
            // Reveal window: the transition must disarm itself after the window so pan-time
            // draw() calls are instant (jitter fix — a listener-based toggling re-armed the
            // transition mid-inertia and made the card oscillate after each pan).
            const clock = sinon.useFakeTimers({now: 0});
            try {
                overlay.armRevealTransition();
                expect(overlay.container.style.transition).to.contain("transform 250ms ease-out");
                clock.tick(299);
                expect(overlay.container.style.transition).to.contain("transform 250ms ease-out");
                clock.tick(1);
                expect(overlay.container.style.transition).to.equal("none");
            } finally {
                clock.restore();
            }
            overlay.disarmRevealTransition();
            expect(overlay.container.style.transition).to.equal("none");
        } finally {
            if (previousGoogle === undefined) delete globalThis.google;
            else globalThis.google = previousGoogle;
        }
    });
});
