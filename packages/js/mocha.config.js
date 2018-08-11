module.exports = {
    globals: ["expect"],
    sort: true,
    fullTrace: true,
    checkLeaks: true,
    require: ["../../babel.register.js", "test/01_setup"],
    exit: true
};
