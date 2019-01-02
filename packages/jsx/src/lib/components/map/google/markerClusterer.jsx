import React from "react";
import {MarkerClusterer} from "react-google-maps/lib/components/addons/MarkerClusterer";
import {GoogleMapMarkerClustererStyles} from "./styles";

export const GoogleMapMarkerClustererComponent = ({...props}) => <MarkerClusterer
    defaultStyles={GoogleMapMarkerClustererStyles}
    defaultMaxZoom={15}
    {...props}
/>;

export default GoogleMapMarkerClustererComponent;
