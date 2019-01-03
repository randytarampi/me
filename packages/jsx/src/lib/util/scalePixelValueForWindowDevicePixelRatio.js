export const scalePixelValueForWindowDevicePixelRatio = pixelValue =>
    window.devicePixelRatio ?
        pixelValue * window.devicePixelRatio :
        pixelValue;

export default scalePixelValueForWindowDevicePixelRatio;
