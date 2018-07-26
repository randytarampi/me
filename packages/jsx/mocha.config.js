module.exports = {
	globals: ["expect"],
	sort: true,
	fullTrace: true,
	checkLeaks: true,
	require: ["babel-core/register", "test/01_setup", "test/02_import-all"],
	exit: true
};
