// @ts-check

/**
 * Decide whether the map loading indicator should be visible.
 *
 * The indicator must stay up not only while the Maps JavaScript API is
 * loading (prd's `loadingElement` behaviour), but also after the API is
 * ready until the first `tilesloaded` event — otherwise users see grey,
 * unpainted tiles with no affordance.
 *
 * @param {{apiLoadingStatus?: string, tilesLoaded?: boolean}} state - The map loading state.
 * @returns {boolean} Whether the loading indicator should be shown.
 */
export const shouldShowMapLoading = ({apiLoadingStatus, tilesLoaded}) => apiLoadingStatus !== "LOADED" || !tilesLoaded;

export default shouldShowMapLoading;