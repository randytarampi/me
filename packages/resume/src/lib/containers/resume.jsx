import {createIsLoadingUrlSelector} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchResumeCreator} from "../actions";
import {ResumeComponent} from "../components/resume";
import selectors from "../data/selectors";

let allResumeCustomContent = {};

try {
    allResumeCustomContent = require("../../resume-custom-content");
} catch (error) {
    if (error.code !== "MODULE_NOT_FOUND") {
        throw error;
    }
}

export const ConnectedResume = connect(
    (state, ownProps) => {
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const variant = ownProps.match.params.variant || "resume";
        const props = {
            resume: ownProps.resume || selectors.getResumeVariant(state, variant),
            isLoading: isLoadingUrlSelector(state, ownProps.fetchUrl) || false,
            variant
        };

        const customContent = ownProps.resume && ownProps.resume.id
            ? allResumeCustomContent[ownProps.resume.id]
            : allResumeCustomContent[variant];

        if (customContent) {
            props.customContent = customContent;
        }

        return props;
    },
    dispatch => {
        return {
            fetchResume: variant => dispatch(fetchResumeCreator(variant))
        };
    }
)(ResumeComponent);

ConnectedResume.propTypes = {
    match: PropTypes.object.isRequired
};

export default ConnectedResume;
