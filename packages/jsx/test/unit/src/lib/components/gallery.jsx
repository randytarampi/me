import {Gallery as GalleryEntity} from "@randy.tarampi/js";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import {GalleryComponent} from "../../../../../src/lib/components/gallery";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "../../../../../src/lib/components/post";
import {WINDOW_LARGE_BREAKPOINT} from "../../../../../src/lib/util";


describe("Gallery", function () {
    let stubGallery;

    beforeEach(function () {
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

    describe("GalleryComponent", function () {
        describe("render", function () {
            const windowInnerWidth = window.innerWidth;

            afterEach(function () {
                window.innerWidth = windowInnerWidth;
            });

            it("renders (window.innerWidth >= WINDOW_LARGE_BREAKPOINT)", function () {
                window.innerWidth = WINDOW_LARGE_BREAKPOINT * 2;

                stubGallery = GalleryEntity.fromJSON({
                    id: "woof",
                    type: "Woof",
                    source: "Woofdy",
                    dateCreated: null,
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
                    post: stubGallery,
                    containerHeight: window.innerHeight,
                    containerWidth: window.innerWidth
                };
                const rendered = shallow(<GalleryComponent {...stubProps}/>);

                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--gallery");
                expect(rendered).to.have.descendants(".post-metadata");
                expect(rendered).to.have.descendants(".post-content");
                expect(rendered).to.have.prop("style");
                expect(rendered).to.containMatchingElement(<PostTitleComponent post={stubGallery}
                                                                               title={stubGallery.title}/>);
                expect(rendered).to.containMatchingElement(<PostBodyAsStringComponent post={stubGallery}/>);
                expect(rendered).to.containMatchingElement(<PostBodyAsArrayComponent post={stubGallery}/>);
                expect(rendered).to.containMatchingElement(<PostDatePublishedComponent post={stubGallery}/>);
                expect(rendered).to.containMatchingElement(<PostDateCreatedComponent post={stubGallery}
                                                                                     label="Taken:"/>);
                expect(rendered).to.containMatchingElement(<PostTagsComponent post={stubGallery}/>);
            });

            it("renders (window.innerWidth < WINDOW_LARGE_BREAKPOINT)", function () {
                window.innerWidth = WINDOW_LARGE_BREAKPOINT / 2;

                stubGallery = GalleryEntity.fromJSON({
                    id: "woof",
                    type: "Woof",
                    source: "Woofdy",
                    dateCreated: null,
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
                    post: stubGallery,
                    containerHeight: window.innerHeight,
                    containerWidth: window.innerWidth
                };
                const rendered = shallow(<GalleryComponent {...stubProps}/>);

                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--gallery");
                expect(rendered).to.not.have.prop("style");

                // NOTE-RT: These are all rendered within the `ProgressiveImage`, so they don't show up in this `shallow`
                expect(rendered).to.not.have.descendants(".post-metadata");
                expect(rendered).to.not.have.descendants(".post-content");
                expect(rendered).to.not.containMatchingElement(<PostTitleComponent post={stubGallery}
                                                                                   title={stubGallery.title}/>);
                expect(rendered).to.not.containMatchingElement(<PostBodyAsStringComponent post={stubGallery}/>);
                expect(rendered).to.not.containMatchingElement(<PostBodyAsArrayComponent post={stubGallery}/>);
                expect(rendered).to.not.containMatchingElement(<PostDatePublishedComponent post={stubGallery}/>);
                expect(rendered).to.not.containMatchingElement(<PostDateCreatedComponent post={stubGallery}
                                                                                         label="Taken:"/>);
                expect(rendered).to.not.containMatchingElement(<PostTagsComponent post={stubGallery}/>);
            });
        });

        describe("#selected", function () {
            const windowDpr = window.devicePixelRatio;

            afterEach(function () {
                window.devicePixelRatio = windowDpr;
            });

            it("returns the appropriate Gallery for no DPR", function () {
                delete window.devicePixelRatio;

                const stubProps = {
                    post: stubGallery,
                    containerHeight: window.innerHeight,
                    containerWidth: window.innerWidth
                };
                const rendered = shallow(<GalleryComponent {...stubProps}/>);

                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--gallery");

                const component = rendered.instance();
                expect(component.selected).to.eql(stubGallery.largestPhoto.getSizedPhotoForLoading());
            });

            it("returns the appropriate Gallery for DPR", function () {
                window.devicePixelRatio = 2;

                const stubProps = {
                    post: stubGallery,
                    containerHeight: stubGallery.smallestPhoto.getSizedPhotoForLoading().width * 2,
                    containerWidth: stubGallery.smallestPhoto.getSizedPhotoForLoading().height * 2
                };
                const rendered = shallow(<GalleryComponent {...stubProps}/>);

                expect(rendered).to.have.id(stubProps.post.uid);
                expect(rendered).to.have.className("post--gallery");

                const component = rendered.instance();
                expect(component.selected).to.eql(stubGallery.largestPhoto.sortedSizedPhotos.last());
            });
        });
    });
});
