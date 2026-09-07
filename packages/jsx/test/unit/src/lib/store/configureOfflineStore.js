import {createRequire} from "module";

const require = createRequire(import.meta.url);

const {expect} = require("chai");
const {buildReduxOfflineConfig, createRuntimeLocationChangeAction, reduxOfflineConfig} = require("../../../../../src/lib/store/configureOfflineStore.js");

describe("configureOfflineStore", function () {
    describe("buildReduxOfflineConfig", function () {
        it("returns a properly structured configuration", function () {
            const builtReduxOfflineConfig = buildReduxOfflineConfig();

            expect(builtReduxOfflineConfig).to.eql(reduxOfflineConfig);
        });

        it("returns a properly structured configuration with overrides", function () {
            const reduxOfflineOverrides = {
                persistOptions: {
                    transforms: [
                        "woof"
                    ]
                }
            };
            const reduxOfflineOtherTransforms = ["meow"];
            const builtReduxOfflineConfig = buildReduxOfflineConfig(reduxOfflineOverrides, reduxOfflineOtherTransforms);

            expect(builtReduxOfflineConfig).to.eql({
                ...reduxOfflineConfig,
                persistOptions: {
                    ...reduxOfflineConfig.persistOptions,
                    transforms: reduxOfflineOverrides.persistOptions.transforms
                        .concat(reduxOfflineConfig.persistOptions.transforms)
                        .concat(reduxOfflineOtherTransforms)
                }
            });
        });
    });

    it("builds a location action from the native history after rehydration", function () {
        const history = {
            action: "POP",
            location: {pathname: "/", search: "", hash: ""}
        };

        expect(createRuntimeLocationChangeAction(history)).to.eql({
            type: "@@router/LOCATION_CHANGE",
            payload: {location: history.location, action: history.action}
        });
    });
});
