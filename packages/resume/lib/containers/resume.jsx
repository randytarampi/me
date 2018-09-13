import {createIsLoadingUrlSelector} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchResumeCreator} from "../actions";
import {ResumeComponent} from "../components/resume";
import selectors from "../data/selectors";

export const ConnectedResume = connect(
    (state, ownProps) => {
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const variant = ownProps.match.params.variant || "default";

        return {
            resume: selectors.getResumeVariant(state, variant),
            isLoading: isLoadingUrlSelector(state, ownProps.fetchUrl) || false,
            variant
        };
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
