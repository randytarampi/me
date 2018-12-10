import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {shallow} from "enzyme";
import {Set} from "immutable";
import React from "react";
import Infinite from "react-infinite";
import sinon from "sinon";
import LoadingSpinner from "../../../../../src/lib/components/loadingSpinner";
import DimensionsContainerWrappedPosts, {
    DimensionsWrappedPosts,
    PostsComponent
} from "../../../../../src/lib/components/posts";
import {PostComponent} from "../../../../../src/lib/components/post";
import computePostHeight from "../../../../../src/lib/util/computePostHeight";
import getComponentForType from "../../../../../src/lib/util/getComponentForType";

describe("Posts", function () {
    let stubPosts;

    beforeEach(function () {
        stubPosts = Set([
            Post.fromJSON({id: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
            Photo.fromJSON({id: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
            Post.fromJSON({id: "grr", dateCreated: new Date().toISOString()}),
            Photo.fromJSON({id: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
        ]);
    });

    describe("DimensionsContainerWrappedPosts", function () {
        it("propagates props to `Dimensions`", function () {
            const stubProps = {
                posts: stubPosts,
                isLoading: true,
                fetchPosts: sinon.stub()
            };
            const rendered = shallow(<DimensionsContainerWrappedPosts {...stubProps}/>);

            expect(rendered).to.be.ok;
            expect(rendered).to.have.className("dimensions-container--posts");
            expect(rendered).to.containMatchingElement(
                <DimensionsWrappedPosts
                    {...stubProps}
                />
            );
        });
    });

    describe("PostsComponent", function () {
        it("renders (with `Post`s)", function () {
            const stubProps = {
                posts: stubPosts,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                fetchPosts: sinon.stub()
            };
            const rendered = shallow(<PostsComponent {...stubProps}/>);
            const {containerWidth, containerHeight, posts, isLoading, fetchPosts, ...expectedProps} = stubProps; // eslint-disable-line no-unused-vars

            expect(rendered).to.be.ok;
            expect(rendered).to.containMatchingElement(
                <Infinite
                    {...expectedProps}
                    useWindowAsScrollContainer={true}
                    infiniteLoadBeginEdgeOffset={window.innerHeight}
                    preloadBatchSize={Infinite.containerHeightScaleFactor(1 / 8)}
                    preloadAdditionalHeight={Infinite.containerHeightScaleFactor(8)}
                    elementHeight={stubPosts.toArray().map(computePostHeight(stubProps.containerWidth))}
                    onInfiniteLoad={stubProps.fetchPosts}
                    isInfiniteLoading={stubProps.isLoading}
                    loadingSpinnerDelegate={<LoadingSpinner/>}
                >
                    {
                        stubPosts.toArray().map(post => {
                            const Constructor = getComponentForType(post.type);
                            return <Constructor key={post.uid} post={post} containerHeight={containerHeight}
                                                containerWidth={containerWidth}/>;
                        })
                    }
                </Infinite>
            );

            expect(stubProps.fetchPosts.notCalled).to.eql(true);
        });

        it("renders (with unknown `Post` types)", function () {
            stubPosts = Set([
                Post.fromJSON({id: "woof", type: "woof", dateCreated: new Date(2500, 0, 1).toISOString()}),
                Photo.fromJSON({id: "meow", type: "meow", dateCreated: new Date(1900, 0, 1).toISOString()}),
                Post.fromJSON({id: "grr", type: "grr", dateCreated: new Date().toISOString()}),
                Photo.fromJSON({id: "rawr", type: "rawr", dateCreated: new Date(3000, 0, 1).toISOString()})
            ]);

            const stubProps = {
                posts: stubPosts,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: false,
                fetchPosts: sinon.stub()
            };
            const rendered = shallow(<PostsComponent {...stubProps}/>);
            const {containerWidth, containerHeight, posts, isLoading, fetchPosts, ...expectedProps} = stubProps; // eslint-disable-line no-unused-vars

            expect(rendered).to.be.ok;
            expect(rendered).to.containMatchingElement(
                <Infinite
                    {...expectedProps}
                    useWindowAsScrollContainer={true}
                    infiniteLoadBeginEdgeOffset={window.innerHeight}
                    preloadBatchSize={Infinite.containerHeightScaleFactor(1 / 8)}
                    preloadAdditionalHeight={Infinite.containerHeightScaleFactor(8)}
                    elementHeight={stubPosts.toArray().map(computePostHeight(stubProps.containerWidth))}
                    onInfiniteLoad={stubProps.fetchPosts}
                    isInfiniteLoading={stubProps.isLoading}
                    loadingSpinnerDelegate={<LoadingSpinner/>}
                >
                    {
                        stubPosts.toArray().map(post => {
                            return <PostComponent key={post.uid} post={post} containerHeight={containerHeight}
                                                  containerWidth={containerWidth}/>;
                        })
                    }
                </Infinite>
            );

            expect(stubProps.fetchPosts.notCalled).to.eql(true);
        });

        it("renders (without `Post`s)", function () {
            const stubProps = {
                posts: null,
                containerHeight: 123,
                containerWidth: 123,
                isLoading: true,
                fetchPosts: sinon.stub()
            };
            const rendered = shallow(<PostsComponent {...stubProps}/>);
            const {containerWidth, containerHeight, posts, isLoading, fetchPosts, ...expectedProps} = stubProps; // eslint-disable-line no-unused-vars

            expect(rendered).to.be.ok;
            expect(rendered).to.containMatchingElement(/* NOTE-RT: Not actually the `LoadingSpinner` because that requires `Infinite`'s internal state to change */
                <Infinite
                    {...expectedProps}
                    useWindowAsScrollContainer={true}
                    infiniteLoadBeginEdgeOffset={window.innerHeight}
                    preloadBatchSize={Infinite.containerHeightScaleFactor(1 / 8)}
                    preloadAdditionalHeight={Infinite.containerHeightScaleFactor(8)}
                    elementHeight={[window.innerHeight]}
                    onInfiniteLoad={stubProps.fetchPosts}
                    isInfiniteLoading={stubProps.isLoading}
                    loadingSpinnerDelegate={<LoadingSpinner/>}
                >
                    <div/>
                </Infinite>
            );

            expect(stubProps.fetchPosts.notCalled).to.eql(true);
        });
    });
});
