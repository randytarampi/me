import {LeftDescriptionSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";

export const LetterAboutYou = ({contentConfiguration}) => {
    return <LeftDescriptionSection
        label="And I think we're a match!"
        description="Is the feeling mutual? I sure hope so"
        {...contentConfiguration.contentProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        {
            contentConfiguration.contentProps.children
                ? contentConfiguration.contentProps.children
                : <Fragment>
                    <p className="letter-you__content">
                        I don't usually talk about myself this often, and I don't usually use the phrase "I want" very
                        often, but
                        now is not one of those times. I want to work for you.
                    </p>
                    <div className="letter-you__content">
                        {
                            contentConfiguration.contentProps.aboutYou || <p>
                                I scoped out your team and it looks like you're doing everything "right". You're using good
                                tools,
                                have an established but growing product, your development culture is agile and tolerant of
                                failure,
                                you have some semblance of people culture outside of work, etc. You're looking for mentors
                                and
                                leaders and that's <em>the</em> one big thing I want to provide in exchange for tagging
                                along the
                                amazing ride you're on. You folks have all the good things going for you and I want in. Can
                                you
                                blame me?
                            </p>
                        }
                    </div>
                </Fragment>
        }
    </LeftDescriptionSection>;
};

LetterAboutYou.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired
};

export default LetterAboutYou;
