import {CampaignLink, ConnectedBear, RowBlock} from "@randy.tarampi/jsx";
import React from "react";
import {Col} from "react-materialize";

const Bears = () =>
    <RowBlock name="bears">
        <Col className="block__bear hide-on-med-and-down" l={5} s={12}>
            <ConnectedBear id="bears-bear"/>
        </Col>
        <Col className="block__text" l={7} s={12}>
            <h2>
                <span className="text">And the Bears?</span>
            </h2>
            <p>
                Well, there was this co-op student and then I got tasked with internationalization... If
                you <em>really</em> want to know, get in touch and I'll come up with some coherent and appropriate
                explanation, depending entirely on who you introduce yourself as.
            </p>
            <p>
                Try not to bonk them on the nose, they're not big fans of that. Also, if you're really interested, you
                can even <CampaignLink href="https://society6.com/randytarampi" text="buy some merchandise"/>.
            </p>
        </Col>
    </RowBlock>;

export default Bears;
