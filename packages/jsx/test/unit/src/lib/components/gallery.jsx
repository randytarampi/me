import {Gallery as GalleryEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import {GalleryComponent} from "../../../../../src/lib/components/gallery";
import {WINDOW_LARGE_BREAKPOINT} from "../../../../../src/lib/util";

describe("Gallery", function () {
    let stubGallery;
    let store;

    beforeEach(function () {
        store = configureStore([])({});
        stubGallery = GalleryEntity.fromJSON({
            id: "woof",
            type: "Woof",
            source: "Woofdy",
            dateCreated: new Date(1900, 0, 1).toISOString(),
            datePublished: new Date(2500, 0, 1).toISOString(),
            width: -1,
            height: -2,
            photos: [
                {
                    id: "woof://woof.woof/woof/woofto",
                    width: 640,
                    height: 480,
                    sizedPhotos: [{url: "woof://woof.woof/woof/woofto", width: 640, height: 480}]
                },
                {
                    id: "woof://woof.woof/woof/woofto?w=800",
                    width: 800,
                    sizedPhotos: [{url: "woof://woof.woof/woof/woofto?w=800", width: 800}]
                }
            ],
            title: "Woof woof woof",
            body: ["ʕ•ᴥ•ʔ", "ʕ•ᴥ•ʔﾉ゛", "ʕ◠ᴥ◠ʔ"],
            sourceUrl: "woof://woof.woof/woof",
            creator: {
                id: -1,
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                url: "woof://woof.woof/woof/woof/woof"
            },
            tags: ["woof", "meow", "grr"]
        });
    });

    it("renders the large gallery layout", function () {
        const originalInnerWidth = window.innerWidth;
        window.innerWidth = WINDOW_LARGE_BREAKPOINT * 2;

        const stubProps = {
            post: stubGallery,
            containerHeight: window.innerHeight,
            containerWidth: window.innerWidth
        };
        const rendered = render(<Provider store={store}><GalleryComponent {...stubProps}/></Provider>);

        expect(rendered.container.firstElementChild?.id).to.eql(stubGallery.uid);
        expect(rendered.container.firstElementChild?.classList.contains("post--gallery")).to.eql(true);
        expect(rendered.container.querySelector(".post-metadata")).to.not.eql(null);
        expect(rendered.container.querySelector(".post-content")).to.not.eql(null);
        expect(rendered.container.firstElementChild?.getAttribute("style")).to.not.eql(null);
        expect(rendered.container.textContent).to.contain("Taken:");

        window.innerWidth = originalInnerWidth;
    });

    it("renders the small gallery layout", function () {
        const originalInnerWidth = window.innerWidth;
        window.innerWidth = WINDOW_LARGE_BREAKPOINT / 2;

        const stubProps = {
            post: stubGallery,
            containerHeight: window.innerHeight,
            containerWidth: window.innerWidth
        };
        const rendered = render(<Provider store={store}><GalleryComponent {...stubProps}/></Provider>);

        expect(rendered.container.firstElementChild?.id).to.eql(stubGallery.uid);
        expect(rendered.container.firstElementChild?.classList.contains("post--gallery")).to.eql(true);
        expect(rendered.container.querySelector(".post-metadata")).to.not.eql(null);
        expect(rendered.container.querySelector(".post-content")).to.eql(null);
        expect(rendered.container.textContent).to.contain(stubGallery.title);

        window.innerWidth = originalInnerWidth;
    });

    it("selects the expected photo for display", function () {
        const stubProps = {
            post: stubGallery,
            containerHeight: window.innerHeight,
            containerWidth: window.innerWidth
        };
        const component = new GalleryComponent(stubProps);

        expect(component.carouselId).to.eql(`${stubGallery.uid}-carousel`);
        expect(component.selected).to.eql(stubGallery.largestPhoto.getSizedPhotoForDisplay(component.targetWidth));
    });
});
