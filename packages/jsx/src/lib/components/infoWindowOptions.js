export const INFO_WINDOW_OPTIONS = Object.freeze({disableAutoPan: true, shouldFocus: false, headerDisabled: true});
export const buildInfoWindowOptions = () => INFO_WINDOW_OPTIONS;
export const getNextVisibleMarkerId = (currentMarkerId, requestedMarkerId) => currentMarkerId === requestedMarkerId ? null : requestedMarkerId;
