import {
    BlogAppLink,
    ConnectedHelloBear,
    EmailLink,
    GitHubLink,
    InstagramLink,
    LinkedInLink,
    ResumeAppLink,
    RowBlock,
    SmsLink
} from "@randy.tarampi/jsx";
import React, {Fragment} from "react";
import {Col} from "react-materialize";

export const IntroText = () =>
    <Fragment>
        <h2>
            <span className="text">Hey!</span>
        </h2>
        <p>
            <span className="text">I'm looking for work, but you probably knew that already because let's be real, you probably clicked through to here from my <ResumeAppLink>resume</ResumeAppLink> or my <LinkedInLink
                useBranding={false} text="LinkedIn"/>.</span>
        </p>
        <p>
                <span className="text">If you're interested in my work check me out on <GitHubLink useBranding={false}
                                                                                                   text="GitHub"/>, look at where I've been on <InstagramLink
                    useBranding={false} text="Instagram"/> or peek in on what's going on in my life at my <BlogAppLink
                    text="blog"/>.</span>
        </p>
        <p>
                <span className="text">
                    And if you're still interested after all that, shoot me an <EmailLink useBranding={false}
                                                                                          text="email" subject="Hey!"
                                                                                          body="I bothered to click on the email link..."/> or <SmsLink
                    useBranding={false} text="text" body="Hey!"/> and let's have a chat!
                </span>
        </p>
    </Fragment>;

export const Intro = () =>
    <Fragment>
        <RowBlock name="intro" className="intro--large hide-on-med-and-down">
            <Col className="block__bear" l={5} m={8} s={12} offset="m2">
                <ConnectedHelloBear id="intro-hello-bear" htmlId="intro-large-hello-bear"/>
            </Col>
            <Col className="block__text" l={7}>
                <IntroText/>
            </Col>
        </RowBlock>
        <RowBlock name="intro-responsive-bear" className="intro-responsive-bear hide-on-large-only">
            <Col className="block__bear" l={5} m={8} s={12} offset="m2">
                <ConnectedHelloBear id="intro-hello-bear" htmlId="intro-responsive-hello-bear"/>
            </Col>
        </RowBlock>
        <RowBlock name="intro-responsive-text" className="intro-responsive-text hide-on-large-only">
            <Col className="block__text" m={8} s={12} offset="m2">
                <IntroText/>
            </Col>
        </RowBlock>
    </Fragment>;


export default Intro;
