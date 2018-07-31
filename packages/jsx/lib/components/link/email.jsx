import PropTypes from "prop-types";
import React, {Component} from "react";
import Link from "./link";

export class EmailLink extends Component {
    render() {
        return <Link {...this.props} className={["link--email", this.className].join(" ").trim()}
                     href={`mailto:${this.props.email}`}/>;
    }
}

EmailLink.propTypes = {
    email: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

EmailLink.defaultProps = {
    email: "randytarampi@randytarampi.ca",
    text: "randytarampi@randytarampi.ca"
};

export default EmailLink;
