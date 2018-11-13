import {CampaignLink} from "@randy.tarampi/jsx";
import React, {Fragment} from "react";
import {JobApplication} from "../lib";
import defaultJobApplication from "./jobApplication";

const date = "2018-10-31";

const recipient = {
    ...defaultJobApplication.letter.recipient,
    jobTitle: "",
    worksFor: {
        name: "Some Awesome Company"
    },
    address: {
        streetAddress: "742 Evergreen Terrace",
        addressLocality: "Springfield",
        addressCountry: "USA",
        postalCode: " "
    }
};

export default JobApplication.fromJSON({
    ...defaultJobApplication,
    renderOptions: {
        format: "Legal",
        mediaType: "print"
    },
    id: "some-awesome-company",
    letter: {
        ...defaultJobApplication.letter,
        recipient,
        content: [
            {
                contentKey: "date",
                contentProps: {
                    date
                }
            },
            {
                contentKey: "recipient"
            },
            {
                contentKey: "salutation",
                contentProps: {
                    greeting: "Greetings"
                }
            },
            {
                contentKey: "intro",
                contentProps: {
                    intro: <Fragment>
                        <p>
                            So. I've been a bit lax on the documentation <CampaignLink
                            href="https://github.com/randytarampi/me/tree/master/packages/job-application#readme">here</CampaignLink>,
                            but if you're seriously looking at this, you should be able to figure out how I managed to
                            customize this content block. It should look a lot like <CampaignLink
                            href="https://github.com/randytarampi/me/blob/master/packages/letter/src/letters/some-awesome-company.json">the
                            example custom <code>some-awesome-company.json</code></CampaignLink>. You'll probably want
                            to compare and contrast this <CampaignLink
                            href="https://github.com/randytarampi/me/tree/master/packages/job-application/src/job-applications/some-awesome-company.json"><code>some-awesome-company.json</code></CampaignLink> with
                            the default <CampaignLink
                            href="https://github.com/randytarampi/me/tree/master/packages/job-application/src/job-applications/jobApplication.js"><code>jobApplication.js</code></CampaignLink>,
                            but it should be pretty straightforward.
                        </p>
                    </Fragment>
                }
            },
            {
                contentKey: "me"
            },
            {
                contentKey: "quality"
            },
            {
                contentKey: "why"
            },
            {
                contentKey: "you"
            },
            {
                contentKey: "thanks",
                contentProps: {
                    thanks: "I hope I didn't waste your time – even if I'm not a match for you folks I hope that I brought a little bit of sunshine to your day out there on the internets, or wherever you may be today."
                }
            },
            {
                contentKey: "signature"
            }
        ]
    }
});
