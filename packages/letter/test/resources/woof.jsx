import React from "react";
import {RightPushSection} from "../../public/components/letter/section";

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
        name: "Woof Woof",
        jobTitle: "Woof",
        worksFor: "WoofWoofWoof",
        location: {
            address: "742 Evergreen Terrace",
            city: "Vancouver",
            countryCode: "CA",
            region: "BC"
        }
    },
    renderOptions: {
        format: "A4",
        mediaType: "print"
    }
};
