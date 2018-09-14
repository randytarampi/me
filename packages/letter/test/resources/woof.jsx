import {RightPushSection} from "@randy.tarampi/jsx";
import React from "react";

const Woof = () => <RightPushSection type="woof">
    WOOF WOOF WOOF
</RightPushSection>;

export default {
    content: [
        {
            contentKey: "date",
            contentProps: {
                date: "2014-06-02"
            }
        },
        {
            contentKey: "recipient"
        },
        {
            contentKey: "salutation"
        },
        {
            contentKey: "intro"
        },
        {
            contentKey: "me"
        },
        {
            component: Woof
        },
        {
            contentKey: "why"
        },
        {
            contentKey: "you"
        },
        {
            contentKey: "thanks"
        },
        {
            contentKey: "signature"
        }
    ],
    recipient: {
        additionalName: "Woof Woof",
        jobTitle: "Woof",
        worksFor: "WoofWoofWoof",
        address: {
            streetAddress: "742 Evergreen Terrace",
            addressLocality: "Vancouver",
            addressCountry: "CA",
            addressRegion: "BC"
        }
    },
    renderOptions: {
        format: "A4",
        mediaType: "print"
    }
};
