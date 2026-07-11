import {LeftDescriptionSection, LetterNpmVersionShield, Shields} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";

export const LetterQuality = ({contentConfiguration}) => {
    return <LeftDescriptionSection
        label="Built to last"
        descriptionNode={<Fragment>
            <p>
                <span className="text">With badges to prove it:</span>
            </p>
            <Shields>
                <LetterNpmVersionShield/>
            </Shields>
        </Fragment>}
        showOnLegal={true}
        {...contentConfiguration.sectionProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        <div className="letter-quality__content">
            {
                contentConfiguration.contentProps.quality || <Fragment>
                    <p>
                        And it's not like I just build software for end users either. Good software should be both easy
                        to use <em>and extend</em>. My first real job in tech as a test developer showed me how quickly
                        teams can move when they have well written and wide-ranging test automation. But it wasn't until
                        I got to Pulse Energy that I saw what you can do and how much you can when you strive for
                        quality — in the code you write, the applications that are deployed and how you handle
                        things when they go wrong.
                    </p>
                    <p>
                        If you're lucky enough to be reading this letter it's because I think you and your team go about
                        your business with quality in mind. You know that the green badges to the left of this text
                        don't come easy — that there's loads of time and energy that goes into having high
                        availability, respectable test coverage, regular releases and well maintained code. I think that
                        you folks do these things (amongst others) and have a culture of quality that extends past your
                        product and to your staff, and I hope to gain from it.
                    </p>
                </Fragment>
            }
        </div>
    </LeftDescriptionSection>;
};

LetterQuality.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired
};

export default LetterQuality;
