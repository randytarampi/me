import {Photo as PhotoEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ProgressiveImageWrappedPhotoComponent, {PhotoComponent} from "../../../lib/components/photo";

describe("Photo", function () {
    let stubPhoto;

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
            body: [
                "ʕ•ᴥ•ʔ",
                "ʕ•ᴥ•ʔﾉ゛",
                "ʕ◠ᴥ◠ʔ"
            ],
            sourceUrl: "woof://woof.woof/woof",
            creator: {
                id: -1,
                username: "ʕ•ᴥ•ʔ",
                name: "ʕ•ᴥ•ʔ",
                sourceUrl: "woof://woof.woof/woof/woof/woof"
            }
        });
    });

    describe("ProgressiveImageWrappedPhotoComponent", function () {
        const windowDpr = window.devicePixelRatio;

        afterEach(function () {
            window.devicePixelRatio = windowDpr;
        });

        it("propagates the correct `src` for no DPR", function () {
            const stubProps = {
                post: stubPhoto,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<ProgressiveImageWrappedPhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.prop("src", stubPhoto.sortedSizedPhotos.first().url);
        });

        it("propagates the correct `src` for a given DPR", function () {
            window.devicePixelRatio = 2;

            const stubProps = {
                post: stubPhoto,
                containerHeight: stubPhoto.getSizedPhotoForLoading().width * 2,
                containerWidth: stubPhoto.getSizedPhotoForLoading().height * 2,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<ProgressiveImageWrappedPhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.prop("src", stubPhoto.sortedSizedPhotos.last().url);
        });

        it("propagates the correct `placeholder`", function () {
            window.devicePixelRatio = 2;

            const stubProps = {
                post: stubPhoto,
                containerHeight: stubPhoto.getSizedPhotoForLoading().width * 2,
                containerWidth: stubPhoto.getSizedPhotoForLoading().height * 2,
                isLoading: true,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<ProgressiveImageWrappedPhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.prop("placeholder", stubPhoto.sortedSizedPhotos.first().url);
        });
    });

    describe("PhotoComponent", function () {
        it("renders (is loading)", function () {
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
                body: [
                    "ʕ•ᴥ•ʔ",
                    "ʕ•ᴥ•ʔﾉ゛",
                    "ʕ◠ᴥ◠ʔ"
                ],
                sourceUrl: "woof://woof.woof/woof",
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            });

            const stubProps = {
                post: stubPhoto,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: true,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<PhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post--photo");
            expect(rendered).to.have.className("post--loading");
        });

        it("renders (no dateCreated)", function () {
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
                body: [
                    "ʕ•ᴥ•ʔ",
                    "ʕ•ᴥ•ʔﾉ゛",
                    "ʕ◠ᴥ◠ʔ"
                ],
                sourceUrl: "woof://woof.woof/woof",
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            });

            const stubProps = {
                post: stubPhoto,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<PhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post--photo");

            expect(rendered).to.have.descendants(".post-title");
            expect(rendered).to.have.descendants(".post-title__link");
            expect(rendered).to.have.descendants(".post-date");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
            expect(rendered).to.not.have.descendants(".post-date__label.post-date__label--created");
            expect(rendered).to.not.have.descendants(".post-date__date.post-date__date--created");
            expect(rendered).to.have.descendants(".post-body");
            expect(rendered).to.have.descendants(".post-body > p > .post-body__text");
        });

        it("renders (no body)", function () {
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
                sourceUrl: "woof://woof.woof/woof",
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            });

            const stubProps = {
                post: stubPhoto,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<PhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post--photo");

            expect(rendered).to.have.descendants(".post-title");
            expect(rendered).to.have.descendants(".post-title__link");
            expect(rendered).to.have.descendants(".post-date");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
            expect(rendered).to.not.have.descendants(".post-body");
        });

        it("renders (plain string body)", function () {
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
                body: "ʕ•ᴥ•ʔ",
                sourceUrl: "woof://woof.woof/woof",
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            });

            const stubProps = {
                post: stubPhoto,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<PhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post--photo");

            expect(rendered).to.have.descendants(".post-metadata");
            expect(rendered).to.have.descendants(".post-title");
            expect(rendered).to.have.descendants(".post-title__link");
            expect(rendered).to.have.descendants(".post-date");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
            expect(rendered).to.have.descendants(".post-body");
            expect(rendered).to.have.descendants(".post-body > p > .post-body__text");
        });

        it("renders (html string body)", function () {
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
                body: "<span class=\"Woof\">ʕ•ᴥ•ʔ</span>",
                sourceUrl: "woof://woof.woof/woof",
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            });

            const stubProps = {
                post: stubPhoto,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<PhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post--photo");

            expect(rendered).to.have.descendants(".post-metadata");
            expect(rendered).to.have.descendants(".post-title");
            expect(rendered).to.have.descendants(".post-title__link");
            expect(rendered).to.have.descendants(".post-date");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
            expect(rendered).to.have.descendants(".post-body");
            expect(rendered).to.have.descendants(".post-body > div");
        });

        it("renders (array body)", function () {
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
                body: [
                    "<span class=\"Woof\">ʕ•ᴥ•ʔ</span>",
                    "ʕ•ᴥ•ʔﾉ゛",
                    "ʕ◠ᴥ◠ʔ"
                ],
                sourceUrl: "woof://woof.woof/woof",
                creator: {
                    id: -1,
                    username: "ʕ•ᴥ•ʔ",
                    name: "ʕ•ᴥ•ʔ",
                    sourceUrl: "woof://woof.woof/woof/woof/woof"
                }
            });

            const stubProps = {
                post: stubPhoto,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<PhotoComponent {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post--photo");

            expect(rendered).to.have.descendants(".post-metadata");
            expect(rendered).to.have.descendants(".post-title");
            expect(rendered).to.have.descendants(".post-title__link");
            expect(rendered).to.have.descendants(".post-date");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--published");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--published");
            expect(rendered).to.have.descendants(".post-date__label.post-date__label--created");
            expect(rendered).to.have.descendants(".post-date__date.post-date__date--created");
            expect(rendered).to.have.descendants(".post-body");
            expect(rendered).to.have.descendants(".post-body > div");
            expect(rendered).to.have.descendants(".post-body > p > .post-body__text");
        });

        describe("#width", function () {
            it("returns the `selected.width`", function () {
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
                    body: [
                        "ʕ•ᴥ•ʔ",
                        "<span class=\"Woof\">ʕ•ᴥ•ʔ</span>",
                        "ʕ◠ᴥ◠ʔ"
                    ],
                    sourceUrl: "woof://woof.woof/woof",
                    creator: {
                        id: -1,
                        username: "ʕ•ᴥ•ʔ",
                        name: "ʕ•ᴥ•ʔ",
                        sourceUrl: "woof://woof.woof/woof/woof/woof"
                    }
                });

                const stubProps = {
                    post: stubPhoto,
                    containerHeight: 123,
                    containerWidth: 123,
                    isLoading: false,
                    source: stubPhoto.getSizedPhotoForLoading().url
                };
                const rendered = shallow(<PhotoComponent {...stubProps}/>);

                expect(rendered).to.be.ok;
                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--photo");

                const component = rendered.instance();
                expect(component).to.be.ok;
                expect(component.width).to.be.ok;
                expect(component.width).to.eql(component.selected.width);
            });
        });

        describe("#height", function () {
            it("returns the `selected.height`", function () {
                const stubProps = {
                    post: stubPhoto,
                    containerHeight: 123,
                    containerWidth: 123,
                    isLoading: false,
                    source: stubPhoto.getSizedPhotoForLoading().url
                };
                const rendered = shallow(<PhotoComponent {...stubProps}/>);

                expect(rendered).to.be.ok;
                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--photo");

                const component = rendered.instance();
                expect(component).to.be.ok;
                expect(component.height).to.be.ok;
                expect(component.height).to.eql(component.selected.height);
            });
        });

        describe("#selected", function () {
            const windowDpr = window.devicePixelRatio;

            afterEach(function () {
                window.devicePixelRatio = windowDpr;
            });

            it("returns the appropriate photo for no DPR", function () {
                const stubProps = {
                    post: stubPhoto,
                    containerHeight: 123,
                    containerWidth: 123,
                    isLoading: false,
                    source: stubPhoto.getSizedPhotoForLoading().url
                };
                const rendered = shallow(<PhotoComponent {...stubProps}/>);

                expect(rendered).to.be.ok;
                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--photo");

                const component = rendered.instance();
                expect(component).to.be.ok;
                expect(component.selected).to.be.ok;
                expect(component.selected).to.eql(stubPhoto.getSizedPhotoForLoading());
            });

            it("returns the appropriate photo for DPR", function () {
                window.devicePixelRatio = 2;

                const stubProps = {
                    post: stubPhoto,
                    containerHeight: stubPhoto.getSizedPhotoForLoading().width * 2,
                    containerWidth: stubPhoto.getSizedPhotoForLoading().height * 2,
                    isLoading: false,
                    source: stubPhoto.getSizedPhotoForLoading().url
                };
                const rendered = shallow(<PhotoComponent {...stubProps}/>);

                expect(rendered).to.be.ok;
                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--photo");

                const component = rendered.instance();
                expect(component).to.be.ok;
                expect(component.selected).to.be.ok;
                expect(component.selected).to.eql(stubPhoto.sortedSizedPhotos.last());
            });
        });
    });
});
