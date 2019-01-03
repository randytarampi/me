import PropTypes from "prop-types";
import {List} from "immutable";
import React, {PureComponent} from "react";
import {ConnectedMap} from "../containers/map";
import {ConnectedPostMarker} from "../containers/postMarker";
import {GoogleMapMarkerClustererComponent} from "./map";

export class MappedPostsComponent extends PureComponent {
    componentDidMount() {
        if (this.props.shouldFetchPostsOnMount) {
            this.props.fetchPosts();
        }
    }

    render() {
        const {posts, fetchPosts, ...props} = this.props;

        return <ConnectedMap
            {...props}
            onIdle={fetchPosts}
        >
            <GoogleMapMarkerClustererComponent
                enableRetinaIcons
            >
                {
                    posts.map(post =>
                        <ConnectedPostMarker post={post} key={post.uid}/>
                    )
                }
            </GoogleMapMarkerClustererComponent>
        </ConnectedMap>;
    }
}

MappedPostsComponent.defaultProps = {
    shouldFetchPostsOnMount: true
};

MappedPostsComponent.propTypes = {
    id: PropTypes.string.isRequired,
    shouldFetchPostsOnMount: PropTypes.bool,
    fetchPosts: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    currentCenter: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired
    }),
    currentBounds: PropTypes.shape({
        north: PropTypes.number.isRequired,
        east: PropTypes.number.isRequired,
        south: PropTypes.number.isRequired,
        west: PropTypes.number.isRequired
    }),
    posts: PropTypes.instanceOf(List)
};

export default MappedPostsComponent;
