const {Photo as PhotoEntity} = require("@randy.tarampi/js");
const {expect} = require("chai");
const {render} = require("@testing-library/react");
const React = require("react");
const configureStore = require("redux-mock-store");
const {Provider} = require("react-redux");
const ProgressiveImageWrappedPhotoComponent = require("../../../../../src/lib/components/photo.jsx").default || require("../../../../../src/lib/components/photo.jsx");
const {PhotoComponent} = require("../../../../../src/lib/components/photo.jsx");

describe("Photo", function () {
    let stubPhoto;
    const globalImage = global.Image;

    beforeEach(function () {
        stubPhoto = PhotoEntity.fromJSON({
            id: "woof",
            type: "Woof",
            source: "Woofdy",
            dateCreated: new Date(1900, 0, 1).toISOString(),
            datePublished: new Date(2500, 0, 1).toISOString(),
            width: -1,
            height: -2,
            sizedPhotos: [
                {url: "woof://woof.woof/woof/woofto", width: 640, height: 480},
                {url: "woof://woof.woof/woof/woofto?w=800", width: 800}
            ],
            title: "Woof woof woof",
            body: ["ʕ•ᴥ•ʔ", "ʕ•ᴥ•ʔﾉ゛", "ʕ◠ᴥ◠ʔ"],
            sourceUrl: "woof://woof.woof/woof",
            creator: {
                id: -1,
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                url: "woof://woof.woof/woof/woof/woof"
            }
        });
    });

    describe("ProgressiveImageWrappedPhotoComponent", function () {
        const windowDpr = window.devicePixelRatio;

        beforeEach(function () {
            global.Image = class {};
        });

        afterEach(function () {
            window.devicePixelRatio = windowDpr;
            global.Image = globalImage;
        });

        it("propagates the correct `src` for no DPR", function () {
            delete window.devicePixelRatio;

            const store = configureStore([])({});
            render(
                <Provider store={store}>
                    <ProgressiveImageWrappedPhotoComponent
                        post={stubPhoto}
                        containerHeight={123}
                        containerWidth={123}
                    />
                </Provider>
            );
        });

        it("propagates the correct `src` for a given DPR", function () {
            window.devicePixelRatio = 2;

            const store = configureStore([])({});
            render(
                <Provider store={store}>
                    <ProgressiveImageWrappedPhotoComponent
                        post={stubPhoto}
                        containerHeight={stubPhoto.getSizedPhotoForLoading().width * 2}
                        containerWidth={stubPhoto.getSizedPhotoForLoading().height * 2}
                    />
                </Provider>
            );
        });

        it("propagates the correct `placeholder`", function () {
            window.devicePixelRatio = 2;

            const store = configureStore([])({});
            render(
                <Provider store={store}>
                    <ProgressiveImageWrappedPhotoComponent
                        post={stubPhoto}
                        containerHeight={stubPhoto.getSizedPhotoForLoading().width * 2}
                        containerWidth={stubPhoto.getSizedPhotoForLoading().height * 2}
                    />
                </Provider>
            );
        });
    });

    describe("PhotoComponent", function () {
        it("renders (is loading)", function () {
            const originalInnerWidth = window.innerWidth;
            window.innerWidth = 1200;

            const store = configureStore([])({});
            const stubProps = {
                post: stubPhoto,
                containerHeight: window.innerHeight,
                containerWidth: window.innerWidth,
                isLoading: true,
                source: stubPhoto.getSizedPhotoForLoading().url,
                placeholder: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = render(
                <Provider store={store}>
                    <PhotoComponent {...stubProps}/>
                </Provider>
            );

            expect(rendered.container.firstElementChild?.id).to.eql(stubProps.post.uid);
            expect(rendered.container.firstElementChild?.classList.contains("post--photo")).to.eql(true);
            expect(rendered.container.firstElementChild?.classList.contains("post--loading")).to.eql(true);
            expect(rendered.container.firstElementChild?.getAttribute("style")).to.not.eql(null);

            window.innerWidth = originalInnerWidth;
        });

        it("renders (has photo)", function () {
            const originalInnerWidth = window.innerWidth;
            window.innerWidth = 1200;

            stubPhoto = PhotoEntity.fromJSON({
                id: "woof",
                type: "Woof",
                source: "Woofdy",
                dateCreated: null,
                datePublished: new Date(2500, 0, 1).toISOString(),
                width: -1,
                height: -2,
                sizedPhotos: [
                    {url: "woof://woof.woof/woof/woofto", width: 640, height: 480},
                    {url: "woof://woof.woof/woof/woofto?w=800", width: 800}
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

            const store = configureStore([])({});
            const stubProps = {
                post: stubPhoto,
                containerHeight: window.innerHeight,
                containerWidth: window.innerWidth,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url,
                placeholder: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = render(
                <Provider store={store}>
                    <PhotoComponent {...stubProps}/>
                </Provider>
            );

            expect(rendered.container.firstElementChild?.id).to.eql(stubProps.post.uid);
            expect(rendered.container.firstElementChild?.classList.contains("post--photo")).to.eql(true);
            expect(rendered.container.querySelector(".post-metadata")).to.not.eql(null);
            expect(rendered.container.querySelector(".post-content")).to.not.eql(null);
            expect(rendered.container.firstElementChild?.getAttribute("style")).to.not.eql(null);

            window.innerWidth = originalInnerWidth;
        });

        describe("selected", function () {
            const windowDpr = window.devicePixelRatio;

            afterEach(function () {
                window.devicePixelRatio = windowDpr;
            });

            it("returns the appropriate photo for no DPR", function () {
                delete window.devicePixelRatio;

                const component = new PhotoComponent({
                    post: stubPhoto,
                    containerHeight: 123,
                    containerWidth: 123,
                    isLoading: false,
                    source: stubPhoto.getSizedPhotoForLoading().url,
                    placeholder: stubPhoto.getSizedPhotoForLoading().url
                });

                expect(component.selected).to.eql(stubPhoto.getSizedPhotoForLoading());
            });

            it("returns the appropriate photo for DPR", function () {
                window.devicePixelRatio = 2;

                const component = new PhotoComponent({
                    post: stubPhoto,
                    containerHeight: stubPhoto.getSizedPhotoForLoading().width * 2,
                    containerWidth: stubPhoto.getSizedPhotoForLoading().height * 2,
                    isLoading: false,
                    source: stubPhoto.getSizedPhotoForLoading().url,
                    placeholder: stubPhoto.getSizedPhotoForLoading().url
                });

                expect(component.selected).to.eql(stubPhoto.sortedSizedPhotos.last());
            });
        });
    });
});
