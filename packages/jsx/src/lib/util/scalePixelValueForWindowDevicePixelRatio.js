// @ts-check
/** @param {number} pixelValue - A raw CSS pixel value. @returns {number} The value adjusted for the current device. */
export const scalePixelValueForWindowDevicePixelRatio = pixelValue =>
    window.devicePixelRatio ?
        pixelValue * window.devicePixelRatio :
        pixelValue;

export default scalePixelValueForWindowDevicePixelRatio;
