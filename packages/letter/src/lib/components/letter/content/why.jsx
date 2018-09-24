import {CampaignLink, LeftDescriptionSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";

export const LetterWhy = ({letter, contentConfiguration}) => {
    const companyName = letter.recipient && letter.recipient.worksFor && typeof letter.recipient.worksFor === "object"
        ? letter.recipient.worksFor.name
        : letter.recipient.worksFor;

    return <LeftDescriptionSection
        label="You could use someone like me"
        description={<Fragment>
            I've babysat hours long database migrations, <CampaignLink
            href="https://github.com/highcharts/highcharts/issues/1476">fiddled with VML in IE8</CampaignLink> and built
            data
            crunching microservices — a bit of it all
        </Fragment>}
        {...contentConfiguration.sectionProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        <div className="letter-why__content">
            {
                contentConfiguration.contentProps.why || <Fragment>
                    <p>
                        I spent the last few years developing on smaller teams — for
                        the newest of auto financing startups to the top name in property management software and I
                        think that I've seen a bit of everything.
                    </p>
                    <p>
                        I've dealt with what happens when your sales team
                        catches fire and you rack up technical debt to meet your deadlines, watched what happens
                        when
                        new hires drop production database tables (<CampaignLink
                        href="https://www.reddit.com/r/cscareerquestions/comments/6ez8ag">the opposite of
                        this</CampaignLink>),
                        seen what happens to your team when you get acquired and then tried to keep spirits high after
                        it
                        gets liquidated. I know what it feels like to get laid off and see a <CampaignLink
                        href="http://fetchauto.ca">startup fizzle out</CampaignLink>. I've seen a lot, learned a lot,
                        failed a
                        couple of times, but I know I haven't done it all yet, and the best way for me to do that is to
                        take
                        a giant leap and hopefully land somewhere
                        like {companyName ? companyName : "your company"}.
                    </p>
                </Fragment>
            }
        </div>
    </LeftDescriptionSection>;
};

LetterWhy.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired
};

export default LetterWhy;
