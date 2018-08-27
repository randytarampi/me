const fs = require("fs");

const rm = filename => {
    fs.unlinkSync(filename);
};

module.exports = rm;
