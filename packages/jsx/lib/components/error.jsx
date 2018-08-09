import PropTypes from "prop-types";
import React, {Component} from "react";
import {DoubtBear} from "./bear";

class Error extends Component {
    componentDidMount() {
        this.props.timedRedirect();
    }

    render() {
        return <div className="error">
            <DoubtBear>
                <p className="error__message center-align">I don't know who told you to come
                    to <code>{`${window.location.origin}${this.props.location.pathname}`}</code>, but there's nothing
                    here. You'll be redirected to the home page
                    (<strong>{`${window.location.origin}${this.props.redirectionLocation}`}</strong>)
                    in {this.props.redirectionTimeout} seconds.</p>
            </DoubtBear>
        </div>;
    }
}

Error.propTypes = {
    location: PropTypes.object.isRequired,
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number.isRequired,
    timedRedirect: PropTypes.func.isRequired
};

export default Error;
