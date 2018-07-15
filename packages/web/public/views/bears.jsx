import {RowBlock} from "@randy.tarampi/jsx";
import React from "react";
import {Col} from "react-materialize";
import Bear from "../components/bear";

const Bears = () =>
    <RowBlock name="intro">
        <Col className="block__bear hide-on-med-and-down" l={5}>
            <Bear/>
        </Col>
        <Col className="block__text" l={7} m={8} offset="m2">
            <h2>
                <span className="text">And the Bears?</span>
            </h2>
            <p>
                <span className="text">Well, there was this co-op student, and then I got tasked with internationalization... If you <em>really</em> want to know, get in touch and I'll come up with some coherent and appropriate explanation, depending entirely on who you introduce yourself as.</span>
            </p>
            <p>
                <span className="text">Try not to bonk them on the nose, they're not big fans of that.</span>
            </p>
        </Col>
    </RowBlock>;

export default Bears;
