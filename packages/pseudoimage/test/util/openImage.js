const lwip = require("lwip");

const openImage = imagePath => {
    return new Promise((resolve, reject) => {
        lwip.open(imagePath, (error, image) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(image);
        });
    });
};

module.exports = openImage;


