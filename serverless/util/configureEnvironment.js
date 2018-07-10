import {configureLogger} from "../../logger";
import loadServerlessSecrets from "./loadServerlessSecrets";

export default () => {
    return loadServerlessSecrets()
        .then(() => {
            return configureLogger();
        });
};
