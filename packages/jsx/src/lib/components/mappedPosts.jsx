import {List} from "immutable";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {ConnectedMap} from "../containers/map/index.jsx";
import {ConnectedPostMarker} from "../containers/postMarker.jsx";
import {GoogleMapMarkerClustererComponent} from "./map/index.jsx";
import {hasReachedMapInteractionCenter, shouldFetchForMapIdle} from "./mapViewport.js";

export {hasMaterialViewportChange, hasReachedMapInteractionCenter, shouldFetchForMapIdle} from "./mapViewport.js";

export class MappedPostsComponent extends PureComponent {
    static defaultProps = {
        shouldFetchPostsOnMount: true
    };

    constructor(props) {
        super(props);

        this.googleMapRef = React.createRef();
        this.getGoogleMap = this.getGoogleMap.bind(this);
        this.handleMapIdle = this.handleMapIdle.bind(this);
        this.lastFetchedBounds = null;
    }

    get googleMap() {
        return this.googleMapRef && this.googleMapRef.current;
    }

    componentDidMount() {
        this.lastFetchedBounds = this.props.currentBounds;
        if (this.props.shouldFetchPostsOnMount) {
            this.props.fetchPosts();
        }
    }

    getGoogleMap() {
        return this.googleMap;
    }

    handleMapIdle() {
        const map = this.googleMap;
        const bounds = this.props.currentBounds;
        const suppressIdle = !!(map && map.__randySuppressNextIdle);

        if (suppressIdle && !hasReachedMapInteractionCenter(map, map.__randySuppressIdleCenter)) {
            return;
        }

        if (map && suppressIdle) {
            delete map.__randySuppressNextIdle;
            delete map.__randySuppressIdleCenter;
            // A follow-up cluster/layout idle must not refetch the completed pan.
            this.lastFetchedBounds = bounds;
        }

        if (shouldFetchForMapIdle(this.lastFetchedBounds, bounds, suppressIdle)) {
            this.lastFetchedBounds = bounds;
            this.props.fetchPosts();
        }
    }

    render() {
        const {posts, ...props} = this.props;

        return <ConnectedMap
            {...props}
            googleMapRef={this.googleMapRef}
            onIdle={this.handleMapIdle}
        >
            <GoogleMapMarkerClustererComponent
                enableRetinaIcons
            >
                {
                    posts.map(post =>
                        <ConnectedPostMarker getGoogleMap={this.getGoogleMap} mapId={props.id} post={post}
                                             key={post.uid}/>
                    )
                }
            </GoogleMapMarkerClustererComponent>
        </ConnectedMap>;
    }
}

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
