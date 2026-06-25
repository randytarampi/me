import packageJson from "../../package";
import {JobApplication} from "../lib/index.js";
import defaultJobApplication from "./jobApplication.js";

export default JobApplication.fromJSON({
    ...defaultJobApplication,
    id: "legal",
    renderOptions: {
        format: "Legal",
        mediaType: "print",

        source: packageJson.name,
        medium: "pdf",
        content: `legal,${packageJson.version}`
    }
});
