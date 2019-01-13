import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {List} from "immutable";
import {
    generateFilterFunctionForFilterName,
    generateTransformFunctionForTransformName
} from "../../../../../src/lib/util";

describe("posts", function () {
    let stubWords;
    let stubPhotos;
    let stubPosts;

    beforeEach(function () {
        stubPhotos = List([
            Photo.fromJSON({
                id: "meow",
                lat: 0.0,
                long: 0.0,
                dateCreated: new Date(1900, 0, 1).toISOString(),
                tags: ["meow"]
            }),
            Photo.fromJSON({id: "rawr", lat: 0.0, long: 0.0, dateCreated: new Date(3000, 0, 1).toISOString()})
        ]);
        stubWords = List([
            Post.fromJSON({id: "woof", lat: 0.0, long: 0.0, dateCreated: new Date(2500, 0, 1).toISOString()}),
            Post.fromJSON({id: "grr", lat: 0.0, long: 0.0, dateCreated: new Date().toISOString()})
        ]);
        stubPosts = stubPhotos.concat(stubWords);
    });

    describe("generateFilterFunctionForFilterName", function () {
        describe("tags", function () {
            it("returns posts with the given tags", function () {
                const filter = generateFilterFunctionForFilterName.tags("meow");
                const filteredPosts = filter(stubPosts);

                expect(filteredPosts.find(post => post.id === stubPhotos.get(0).id)).to.eql(stubPhotos.get(0));
                expect(filteredPosts.size).to.eql(1);
            });
        });

        describe("earlierThan", function () {
            it("returns posts `earlierThan` the given date", function () {
                const postWithLatestDate = Post.fromJSON({
                    id: "arf",
                    dateCreated: new Date(Date.now() + 1).toISOString()
                });
                stubPosts = stubPosts.push(postWithLatestDate);

                const filter = generateFilterFunctionForFilterName.earlierThan(postWithLatestDate.date);
                const filteredPosts = filter(stubPosts);

                expect(filteredPosts.find(post => post.id === postWithLatestDate.id)).to.eql(postWithLatestDate);
                expect(filteredPosts.size).to.eql(stubPosts.size - 2);
            });
        });

        describe("location", function () {
            it("returns posts with locations", function () {
                const postWithoutLocation = Post.fromJSON({id: "arf", dateCreated: new Date().toISOString()});
                stubPosts = stubPosts.push(postWithoutLocation);

                const filter = generateFilterFunctionForFilterName.location();
                const filteredPosts = filter(stubPosts);

                expect(filteredPosts.find(post => post.id === postWithoutLocation.id)).to.eql(undefined);
                expect(filteredPosts.size).to.eql(stubPosts.size - 1);
            });
        });

        describe("boundingBox", function () {
            it("returns posts within the bounding box", function () {
                const postWithinBoundingBox = Post.fromJSON({
                    id: "arf",
                    lat: 2,
                    long: 2,
                    dateCreated: new Date().toISOString()
                });
                stubPosts = stubPosts.push(postWithinBoundingBox);

                const filter = generateFilterFunctionForFilterName.boundingBox(3, 3, 1, 1);
                const filteredPosts = filter(stubPosts);

                expect(filteredPosts.find(post => post.id === postWithinBoundingBox.id)).to.eql(postWithinBoundingBox);
                expect(filteredPosts.size).to.eql(1);
            });
        });
    });

    describe("generateTransformFunctionForTransformName", function () {
        describe("location", function () {
            it("returns posts with unique locations", function () {
                const transform = generateTransformFunctionForTransformName.location();
                const transformedPosts = transform(stubPosts);

                expect(transformedPosts.size).to.eql(stubPosts.size);
                expect(new Set(stubPosts.toArray().map(post => post.lat)).size).to.not.eql(stubPosts.size);
                expect(new Set(stubPosts.toArray().map(post => post.long)).size).to.not.eql(stubPosts.size);
                expect(new Set(transformedPosts.toArray().map(post => post.lat)).size).to.eql(stubPosts.size);
                expect(new Set(transformedPosts.toArray().map(post => post.long)).size).to.eql(stubPosts.size);
            });
        });
    });
});
