import {CampaignLink, LeftDescriptionSection} from "@randy.tarampi/jsx";
import PropTypes from "prop-types";
import React, {Fragment} from "react";

export const LetterAboutMe = ({contentConfiguration}) => {
    return <LeftDescriptionSection
        label="I love to code"
        description={<Fragment>
            Need someone to ramp up quickly and keep pace? That's me — just take a look at my <CampaignLink
            href="https://github.com/randytarampi" text="GitHub contribution history"/>
        </Fragment>}
        {...contentConfiguration.contentProps}
        type={contentConfiguration.contentKey}
        printableType="letter"
    >
        <div className="letter-me__content">
            {
                contentConfiguration.contentProps.aboutMe || <p>
                    I'm not your run of the mill software developer. I love being away from my
                    screens — <CampaignLink
                    href="https://www.flickr.com/photos/randytarampi/29098786007" text="getting outdoors"/>, travelling
                    to <CampaignLink
                    href="https://500px.com/photo/202736697/that-camera-emoji-by-randy-tarampi" text="far off
                    places"/> and getting <CampaignLink href="https://unsplash.com/photos/LWYW0EIBXyQ" text="as
                    far away from an
                    internet connection as you can get"/>. I don't like spending a lot of time in front of
                    the
                    computer and I think that there are a lot of people out there that feel the same way, <em>maybe even
                    yourself</em>, and that's why I build software. There are better ways to spend your time than doing
                    your accounting by hand, queueing up to order your morning coffee or editing your photos to look
                    "good". We have software to do these things better and faster than we can ourselves, to make our
                    lives and easier — and that's the kind software that I like to build.
                </p>
            }
        </div>
    </LeftDescriptionSection>;
};

LetterAboutMe.propTypes = {
    letter: PropTypes.object.isRequired,
    contentConfiguration: PropTypes.object.isRequired,
};

export default LetterAboutMe;
