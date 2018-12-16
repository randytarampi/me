import {DoubtBear} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React from "react";
import {ConnectedBear} from "../../../containers/emoji/bear";
import {InternalLink} from "../../link/internal";

export const ErrorENOACCESSContentComponent = props => <ConnectedBear emoji={DoubtBear.fromJS()} id="error-doubt-bear">
    <h2 className="error__message--header">
        <span className="text">What are you looking for?</span>
    </h2>
    <p className="error__message">
        I don't know who told you to come to <code>{`${window.location.origin}${props.location.get("pathname")}`}</code>,
        but there's nothing here. Go back to the <InternalLink target="_self" href={`${props.redirectionLocation}`}>home
        page</InternalLink>.
    </p>
</ConnectedBear>;

ErrorENOACCESSContentComponent.propTypes = {
    location: PropTypes.object.isRequired,
    redirectionLocation: PropTypes.string.isRequired
};

export default ErrorENOACCESSContentComponent;
