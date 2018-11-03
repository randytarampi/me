import packageJson from "../../package";
import {JobApplication} from "../lib";
import defaultJobApplication from "./jobApplication";

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
