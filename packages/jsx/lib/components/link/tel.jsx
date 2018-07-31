import PropTypes from "prop-types";
import React, {Component} from "react";
import Link from "./link";

export class TelLink extends Component {
    render() {
        return <Link {...this.props} className={["link--tel", this.className].join(" ").trim()}
                     href={`tel:${this.props.tel}`}/>;
    }
}

TelLink.propTypes = {
    tel: PropTypes.string.isRequired
};

TelLink.defaultProps = {
    tel: "+16043747128",
    text: "+1 (604) 374-7128"
};

export default TelLink;
