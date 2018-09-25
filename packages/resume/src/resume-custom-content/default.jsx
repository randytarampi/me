import {CampaignLink} from "@randy.tarampi/jsx";
import React, {Fragment} from "react";
import {ResumeCustomContent, ResumeCustomPrintableSectionContent} from "../lib/resumeCustomContent";

const defaultContent = new ResumeCustomContent({
    education: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p><span className="text">I went to school on top of a mountain for 5 years</span></p>
            <p><span className="text">I remember some things better than others, like the snow days. For everything else there's <CampaignLink
                href="https://www.goodreads.com/book/show/29437996-copying-and-pasting-from-stack-overflow">StackOverflow</CampaignLink></span>
            </p>
        </Fragment>
    }),
    projects: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p><span className="text">Vanity seems to be in vogue and I'm not usually one for ideas, so these are all about me</span>
            </p>
            <p><span className="text">Frankly, I'd much rather be outside exploring rather than on my computer in my downtime</span>
            </p>
            <p><span className="text">Tried to keep myself disciplined here, but I'm a lot better when I have people actually holding me to account</span>
            </p>
            <div className="shields">
                <CampaignLink
                    className="shield"
                    href="https://www.randytarampi.ca"
                    aria-label="Is www.randytarampi.ca up?"
                    name="Up status">
                    <img
                        className="shield__image"
                        src="https://img.shields.io/website-up-down-green-red/https/www.randytarampi.ca.svg?label=www.randytarampi.ca&style=flat-square"
                    />
                </CampaignLink>
                <CampaignLink
                    className="shield"
                    href="https://uptime.randytarampi.ca"
                    aria-label="Uptime status"
                    name="Uptime">
                    <img
                        className="shield__image"
                        src="https://img.shields.io/uptimerobot/ratio/m780949566-9b1b7cc0bdd3be425a9e6ac8.svg?style=flat-square"
                    />
                </CampaignLink>
                <CampaignLink
                    className="shield"
                    href="https://travis-ci.org/randytarampi/me"
                    aria-label="Travis build"
                    name="Travis">
                    <img
                        className="shield__image"
                        src="https://img.shields.io/travis/randytarampi/me.svg?style=flat-square"
                    />
                </CampaignLink>
                <CampaignLink
                    className="shield"
                    href="https://coveralls.io/github/randytarampi/me"
                    aria-label="Coveralls score"
                    name="Coveralls">
                    <img
                        className="shield__image"
                        src="https://img.shields.io/coveralls/github/randytarampi/me.svg?style=flat-square"
                    />
                </CampaignLink>
                <CampaignLink
                    className="shield"
                    href="https://codeclimate.com/github/randytarampi/me/maintainability"
                    aria-label="Code Climate score"
                    name="Code Climate">
                    <img
                        className="shield__image"
                        src="https://img.shields.io/codeclimate/maintainability-percentage/randytarampi/me.svg?style=flat-square"
                    />
                </CampaignLink>
            </div>
        </Fragment>
    }),
    skills: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p><span className="text">I'm more or less a full stack JavaScript developer</span></p>
            <p><span className="text">Ask me about my soft skills — those are more fun</span></p>
        </Fragment>
    }),
    volunteer: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p><span className="text">I never really <em>want</em> to volunteer, but when it happens it seems that I really enjoy it</span>
            </p>
            <p><span className="text">People have always seen me as shy and reserved but it actually turns out that I've got a knack for leadership and mentorship</span>
            </p>
        </Fragment>
    }),
    work: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p><span className="text">I met the CTO at Fetch Auto 5 years ago as an intern at Pulse Energy and have been pretty inseparable until now</span>
            </p>
            <p><span className="text">It's time to strike it out on my own though — he got me to come back and work with him not once, but twice and I'm looking for a place where I can settle down and build similarly close working relationships</span>
            </p>
            <p><span className="text">Ask me about how I ended up learning Italian on the job, my cadres of co-op students, or when I almost <CampaignLink
                href="http://www.quickmeme.com/p/3vv8p3">brought down a busy test environment</CampaignLink> as an intern</span>
            </p>
        </Fragment>
    })
});

export default defaultContent;
