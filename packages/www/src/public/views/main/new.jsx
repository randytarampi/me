import {CampaignLink, ConnectedPosts, RowBlock} from "@randy.tarampi/jsx";
import React from "react";
import {Col} from "react-materialize";

const New = () =>
    <RowBlock name="new">
        <Col className="block__text" s={12}>
            <h2>
                <span className="text">So what's new? <CampaignLink text=" " className="link--rss"
                                                                    href={__POSTS_FEED_URL__}/></span>
            </h2>
            <ConnectedPosts
                fetchUrl={`${__POSTS_SERVICE_URL__}`}
                infiniteLoadBeginEdgeOffset={undefined}
                shouldFetchPostsOnMount={true}
                postsLimit={3}
            />
        </Col>
    </RowBlock>;

export default New;
