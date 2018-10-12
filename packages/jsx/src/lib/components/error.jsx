import {DeadBear, DoubtBear, ShrugBear} from "@randy.tarampi/js";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {Col, Row} from "react-materialize";
import {ConnectedBear} from "../containers/emoji/bear";
import {EmailLink, InternalLink} from "./link";

export class Error extends Component {
    componentDidMount() {
        if (
            [404, "ENOTFOUND"].includes(this.props.errorCode) && !this.props.errorTimeoutHandlerId
        ) {
            this.props.timedRedirect();
        }
    }

    render() {
        let errorContent;

        switch (this.props.errorCode) {
            case 500:
            case "EFETCH":
                errorContent =
                    <ConnectedBear emoji={DeadBear.fromJS()} id="error-dead-bear">
                        <h2 className="error__message--header">
                            <span className="text">He's dead, Jim.</span>
                        </h2>
                        <p className="error__message">
                            You've just tripped something and I've been notified. <EmailLink useBranding={false}
                                                                                             subject={`I broke something at ${DateTime.local().toLocaleString(DateTime.DATETIME_FULL)}`}>Let
                            me know</EmailLink> if you're super keen and I can probably walk you through what
                            happened.
                        </p>
                    </ConnectedBear>;
                break;

            case "ENOPOSTS":
                errorContent =
                    <ConnectedBear emoji={ShrugBear.fromJS()} id="error-shrug-bear">
                        <h2 className="error__message--header">
                            <span className="text">Nothing to see here... yet.</span>
                        </h2>
                        <p className="error__message">
                            There's no content to serve up just yet, but come back soon and there'll probably be
                            something
                            here.
                        </p>
                    </ConnectedBear>;
                break;

            case 404:
            case "ENOTFOUND":
                errorContent =
                    <ConnectedBear emoji={DoubtBear.fromJS()} id="error-doubt-bear">
                        <h2 className="error__message--header">
                            <span className="text">What are you looking for?</span>
                        </h2>
                        <p className="error__message">
                            I don't know who told you to come
                            to <code>{`${window.location.origin}${this.props.location ? this.props.location.get("pathname") : window.location.pathname}`}</code>,
                            but
                            there's
                            nothing here. You'll be redirected to the <InternalLink target="_self"
                                                                                    href={`${this.props.redirectionLocation}`}>home
                            page</InternalLink> in {this.props.redirectionTimeout} seconds.
                        </p>
                    </ConnectedBear>;
                break;

            default:
                errorContent =
                    <ConnectedBear emoji={DoubtBear.fromJS()} id="error-doubt-bear">
                        <h2 className="error__message--header">
                            <span className="text">What are you looking for?</span>
                        </h2>
                        <p className="error__message">
                            I don't know who told you to come
                            to <code>{`${window.location.origin}${this.props.location ? this.props.location.get("pathname") : window.location.pathname}`}</code>,
                            but
                            there's
                            nothing here. Go back to the <InternalLink target="_self"
                                                                       href={`${this.props.redirectionLocation}`}>home
                            page</InternalLink>.
                        </p>
                    </ConnectedBear>;
                break;
        }

        return <div className="error">
            <Row>
                <Col>
                    {errorContent}
                </Col>
            </Row>
        </div>;
    }

    componentWillUnmount() {
        this.props.clearErrorTimeoutHandler();
    }
}

Error.propTypes = {
    error: PropTypes.object,
    errorCode: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    errorMessage: PropTypes.string,
    errorTimeoutHandlerId: PropTypes.number,
    location: PropTypes.object.isRequired,
    redirectionLocation: PropTypes.string.isRequired,
    redirectionTimeout: PropTypes.number.isRequired,
    timedRedirect: PropTypes.func.isRequired,
    clearErrorTimeoutHandler: PropTypes.func.isRequired
};

export default Error;
