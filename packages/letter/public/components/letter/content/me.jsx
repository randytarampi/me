import {Link} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {LeftDescriptionSection} from "../section";

export const LetterAboutMe = ({letter, contentConfiguration}) => {
    return <LeftDescriptionSection
        label="I love to code"
        description={<Fragment>
            Need someone to ramp up quickly and keep pace? That's me &mdash; just take a look at my <Link
            href="https://github.com/randytarampi">GitHub contribution history</Link>
        </Fragment>}
        {...contentConfiguration.contentProps}
        type={contentConfiguration.contentKey}
    >
        <p className="letter-me__content">
            {
                contentConfiguration.contentProps.aboutMe || <Fragment>
                    I'm not your run of the mill software developer. I love being away from my
                    screens &mdash; going <Link
                    href="https://www.flickr.com/photos/randytarampi/29098786007">outdoors</Link>, travelling to <Link
                    href="https://500px.com/photo/202736697/that-camera-emoji-by-randy-tarampi">far off
                    places</Link> and getting <Link href="https://unsplash.com/photos/LWYW0EIBXyQ">as far away from an
                    internet connection as you can get</Link>. I don't like spending a lot of time in front of the
                    computer and I think that there are a lot of people out there that feel the same way, <em>maybe even
                    yourself</em>, and that's why I build software. There are better ways to spend your time than doing
                    your accounting by hand, queueing up to order your morning coffee or editing your photos to look
                    "good". We have software to do these things better and faster than we can ourselves, to make our
                    lives and easier &mdash; and that's the kind software that I like to build.
                </Fragment>
            }
        </p>
    </LeftDescriptionSection>;
};

LetterAboutMe.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
};

export default LetterAboutMe;
