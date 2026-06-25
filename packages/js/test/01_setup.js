globalThis.__CAMPAIGN_SOURCE__ = process.env.CAMPAIGN_SOURCE || "";
globalThis.__CAMPAIGN_MEDIUM__ = process.env.CAMPAIGN_MEDIUM || "referral";
globalThis.__CAMPAIGN_NAME__ = process.env.CAMPAIGN_NAME || "";
globalThis.__CAMPAIGN_TERM__ = process.env.CAMPAIGN_TERM || "";
globalThis.__CAMPAIGN_CONTENT__ = process.env.CAMPAIGN_CONTENT || "";

import "../src/index.js";
