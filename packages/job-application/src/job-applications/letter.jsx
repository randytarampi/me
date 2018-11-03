import packageJson from "../../package";
import {JobApplication} from "../lib";
import defaultJobApplication from "./jobApplication";

export default JobApplication.fromJSON({
    ...defaultJobApplication,
    id: "letter",
    renderOptions: {
        format: "Letter",
        mediaType: "print",

        source: packageJson.name,
        medium: "pdf",
        content: `letter,${packageJson.version}`
    }
});
