import {createIsLoadingUrlSelector} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchResumeCreator} from "../actions/index.js";
import {buildFetchUrlForVariant} from "../api/index.js";
import {ResumeComponent} from "../components/resume/index.jsx";
import selectors from "../data/selectors.js";

// NOTE-RT: `resume-custom-content` is an optional, gitignored, user-supplied local override
// module. This file is compiled into two very different targets from the same source: webpack's
// browser bundle (where a bare `require(...)` is webpack's own native, statically-resolved
// primitive and always available, ESM or not) and this package's standalone `esm/` library build
// output (genuine ESM, no bundler present, so a bare `require` doesn't exist at runtime). Rather
// than statically importing Node's `module`/`createRequire` here (which would break the webpack
// build - it has no browser polyfill for that builtin), the standalone build's own Babel pass
// (`BABEL_ESM_STANDALONE_BUILD`, see `babel.config.js`) injects a real `createRequire`-backed
// `require` binding automatically wherever a bare `require(...)` call like this one is found.
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
        const fetchUrl = ownProps.fetchUrl || buildFetchUrlForVariant(variant);
        const props = {
            resume: ownProps.resume || selectors.getResumeVariant(state, variant),
            isLoading: isLoadingUrlSelector(state, fetchUrl) || false,
            variant
        };

        let customContent;

        if (ownProps.resume) {
            if (ownProps.resume.customContent) {
                customContent = ownProps.resume.customContent;
            } else if (ownProps.resume.id) {
                customContent = allResumeCustomContent[ownProps.resume.id];
            } else {
                customContent = allResumeCustomContent[variant];
            }
        } else {
            customContent = allResumeCustomContent[variant];
        }

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
