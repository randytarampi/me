import {createIsLoadingUrlSelector} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchLetterCreator} from "../actions/index.js";
import {buildFetchUrlForVariant} from "../api/index.js";
import {LetterComponent} from "../components/letter/index.jsx";
import selectors from "../data/selectors.js";

export const ConnectedLetter = connect(
    (state, ownProps) => {
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const variant = ownProps.match.params.variant || "letter";
        const fetchUrl = ownProps.fetchUrl || buildFetchUrlForVariant(variant);

        return {
            letter: ownProps.letter || selectors.getLetterVariant(state, variant),
            isLoading: isLoadingUrlSelector(state, fetchUrl) || false,
            variant
        };
    },
    dispatch => {
        return {
            fetchLetter: variant => dispatch(fetchLetterCreator(variant))
        };
    }
)(LetterComponent);

ConnectedLetter.propTypes = {
    match: PropTypes.object.isRequired
};

export default ConnectedLetter;
