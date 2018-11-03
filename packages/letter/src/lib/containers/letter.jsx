import {createIsLoadingUrlSelector} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchLetterCreator} from "../actions";
import {buildFetchUrlForVariant} from "../api";
import {LetterComponent} from "../components/letter";
import selectors from "../data/selectors";

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
