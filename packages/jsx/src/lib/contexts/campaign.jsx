import React from "react";

export const CampaignContext = React.createContext({
    source: __CAMPAIGN_SOURCE__ || undefined,
    medium: __CAMPAIGN_MEDIUM__ || undefined,
    name: __CAMPAIGN_NAME__ || undefined,
    term: __CAMPAIGN_TERM__ || undefined,
    content: __CAMPAIGN_CONTENT__ || undefined
});

export default CampaignContext;
