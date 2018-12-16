import {DeadBear} from "@randy.tarampi/js";
import {DateTime} from "luxon";
import React from "react";
import {ConnectedBear} from "../../../containers/emoji/bear";
import {EmailLink} from "../../link";

export const ErrorESERVERContentComponent = () => <ConnectedBear emoji={DeadBear.fromJS()} id="error-dead-bear">
    <h2 className="error__message--header">
        <span className="text">He's dead, Jim.</span>
    </h2>
    <p className="error__message">
        You've just tripped something and I've been notified. <EmailLink useBranding={false}
                                                                         subject={`I broke something at ${DateTime.local().toLocaleString(DateTime.DATETIME_FULL)}`}>Let
        me know</EmailLink> if you're super keen and I can probably walk you through what happened.
    </p>
</ConnectedBear>;

export default ErrorESERVERContentComponent;
