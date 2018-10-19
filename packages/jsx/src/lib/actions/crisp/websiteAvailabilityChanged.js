import {createAction} from "redux-actions";

export const CRISP_WEBSITE_AVAILABILITY_CHANGED = "CRISP_WEBSITE_AVAILABILITY_CHANGED";

export const crispWebsiteAvailabilityChangedCreator = availability => dispatch => {
    dispatch(websiteAvailabilityChanged(availability));
};

export const websiteAvailabilityChanged = createAction(CRISP_WEBSITE_AVAILABILITY_CHANGED);

export default crispWebsiteAvailabilityChangedCreator;
