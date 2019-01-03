import {expect} from "chai";
import {buildReduxOfflineConfig, reduxOfflineConfig} from "../../../../../src/lib/store/configureOfflineStore";

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
});
