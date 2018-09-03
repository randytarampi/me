import {Link, Printable} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";

const {LeftDescriptionSection} = Printable;

export const LetterWhy = ({letter, contentConfiguration}) => {
    return <LeftDescriptionSection
        label="You could use someone like me"
        description={<Fragment>
            I've babysat hours long database migrations, <Link
            href="https://github.com/highcharts/highcharts/issues/1476">fiddled with VML in IE8</Link> and built data
            crunching microservices &mdash; a bit of it all
        </Fragment>}
        {...contentConfiguration.sectionProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        <p className="letter-why__content">
            {
                contentConfiguration.contentProps.why || <Fragment>
                    I've spent the last few years working as a full stack developer on small to medium sized teams for
                    the newest of auto financing startups to the top name in property management software and I'd like
                    to think that I've seen a bit of everything. I've dealt with what happens when your sales team
                    catches fire and you rack up technical debt to meet your deadlines. I've watched what happens when
                    new hires drop production database tables (<Link
                    href="https://www.reddit.com/r/cscareerquestions/comments/6ez8ag">the opposite of this</Link>). I've
                    seen what happens to your team when you get acquired and then tried to keep spirits high after it
                    gets liquidated. I know what it feels like to get laid off and see a <Link
                    href="http://fetchauto.ca">startup fizzle out</Link>. I've seen a lot, learned a lot, failed a
                    couple of times, but I know I haven't done it all yet, and the best way for me to do that is to take
                    a giant leap and hopefully land somewhere
                    like {letter.recipient && letter.recipient.company ? letter.recipient.company : "your company"}.
                </Fragment>
            }
        </p>
    </LeftDescriptionSection>;
};

LetterWhy.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
};

export default LetterWhy;
