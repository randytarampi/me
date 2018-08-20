import PropTypes from "prop-types";
import React, {Component} from "react";
import {DoubtBear, ShrugBear} from "./bear";

class Error extends Component {
    componentDidMount() {
        if (
            !this.props.errorCode
            || [404, "ENOTFOUND"].includes(this.props.errorCode)
        ) {
            this.props.timedRedirect();
        }
    }

    render() {
        let errorContent;

        switch (this.props.errorCode) {
            case "ENOPOSTS":
                errorContent = <ShrugBear>
                    <p className="error__message center-align">
                        There's no content to serve up just yet, but come back soon and there'll probably be something
                        here.
                    </p>
                </ShrugBear>;
                break;

            case 404:
            case "ENOTFOUND":
            default:
                errorContent = <DoubtBear>
                    <p className="error__message center-align">
                        I don't know who told you to come
                        to <code>{`${window.location.origin}${this.props.location.pathname}`}</code>, but there's
                        nothing here. You'll be redirected to the home page
                        (<strong>{`${window.location.origin}${this.props.redirectionLocation}`}</strong>)
                        in {this.props.redirectionTimeout} seconds.
                    </p>
                </DoubtBear>;
                break;
        }

        return <div className="error">
            {errorContent}
        </div>;
    }
}

Error.propTypes = {
    error: PropTypes.object,
    errorCode: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    errorMessage: PropTypes.string,
    location: PropTypes.object.isRequired,
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number.isRequired,
    timedRedirect: PropTypes.func.isRequired
};

export default Error;
