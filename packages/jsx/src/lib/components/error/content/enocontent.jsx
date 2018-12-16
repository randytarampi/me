import {ShrugBear} from "@randy.tarampi/js";
import React from "react";
import {ConnectedBear} from "../../../containers/emoji/bear";

export const ErrorENOCONTENTContentComponent = () => <ConnectedBear emoji={ShrugBear.fromJS()} id="error-shrug-bear">
    <h2 className="error__message--header">
        <span className="text">Nothing to see here... yet.</span>
    </h2>
    <p className="error__message">
        There's no content to serve up just yet, but come back soon and there'll probably be something here.
    </p>
</ConnectedBear>;

export default ErrorENOCONTENTContentComponent;
