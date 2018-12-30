import {Photo as PhotoEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import ProgressiveImageWrappedPhotoComponent, {PhotoComponent} from "../../../../../src/lib/components/photo";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "../../../../../src/lib/components/post";


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
                url: "woof://woof.woof/woof/woof/woof"
            }
        });
    });

    describe("ProgressiveImageWrappedPhotoComponent", function () {
        const windowDpr = window.devicePixelRatio;

        afterEach(function () {
            window.devicePixelRatio = windowDpr;
        });

        it("propagates the correct `src` for no DPR", function () {
            delete window.devicePixelRatio;

            const stubProps = {
                post: stubPhoto,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<ProgressiveImageWrappedPhotoComponent {...stubProps}/>);

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
                    url: "woof://woof.woof/woof/woof/woof"
                }
            });

            const stubProps = {
                post: stubPhoto,
                containerHeight: window.innerHeight,
                containerWidth: window.innerWidth,
                isLoading: true,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<PhotoComponent {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post--photo");
            expect(rendered).to.have.className("post--loading");
            expect(rendered).to.have.prop("style");
            expect(rendered).to.containMatchingElement(<PostTitleComponent post={stubPhoto} title={stubPhoto.title}/>);
            expect(rendered).to.containMatchingElement(<PostBodyAsStringComponent post={stubPhoto}/>);
            expect(rendered).to.containMatchingElement(<PostBodyAsArrayComponent post={stubPhoto}/>);
            expect(rendered).to.containMatchingElement(<PostDatePublishedComponent post={stubPhoto}/>);
            expect(rendered).to.containMatchingElement(<PostDateCreatedComponent post={stubPhoto} label="Taken:"/>);
            expect(rendered).to.containMatchingElement(<PostTagsComponent post={stubPhoto}/>);
        });

        it("renders (has photo)", function () {
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
                    url: "woof://woof.woof/woof/woof/woof"
                },
                tags: [
                    "woof",
                    "meow",
                    "grr"
                ]
            });

            const stubProps = {
                post: stubPhoto,
                containerHeight: window.innerHeight,
                containerWidth: window.innerWidth,
                isLoading: false,
                source: stubPhoto.getSizedPhotoForLoading().url
            };
            const rendered = shallow(<PhotoComponent {...stubProps}/>);

            expect(rendered).to.have.id(stubProps.post.uid);
            expect(rendered).to.have.className("post--photo");
            expect(rendered).to.have.descendants(".post-metadata");
            expect(rendered).to.have.descendants(".post-content");
            expect(rendered).to.have.prop("style");
            expect(rendered).to.containMatchingElement(<PostTitleComponent post={stubPhoto} title={stubPhoto.title}/>);
            expect(rendered).to.containMatchingElement(<PostBodyAsStringComponent post={stubPhoto}/>);
            expect(rendered).to.containMatchingElement(<PostBodyAsArrayComponent post={stubPhoto}/>);
            expect(rendered).to.containMatchingElement(<PostDatePublishedComponent post={stubPhoto}/>);
            expect(rendered).to.containMatchingElement(<PostDateCreatedComponent post={stubPhoto} label="Taken:"/>);
            expect(rendered).to.containMatchingElement(<PostTagsComponent post={stubPhoto}/>);
        });

        describe("selected", function () {
            const windowDpr = window.devicePixelRatio;

            afterEach(function () {
                window.devicePixelRatio = windowDpr;
            });

            it("returns the appropriate photo for no DPR", function () {
                delete window.devicePixelRatio;

                const stubProps = {
                    post: stubPhoto,
                    containerHeight: 123,
                    containerWidth: 123,
                    isLoading: false,
                    source: stubPhoto.getSizedPhotoForLoading().url
                };
                const rendered = shallow(<PhotoComponent {...stubProps}/>);

                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--photo");

                const component = rendered.instance();
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

                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--photo");

                const component = rendered.instance();
                expect(component.selected).to.eql(stubPhoto.sortedSizedPhotos.last());
            });
        });
    });
});
