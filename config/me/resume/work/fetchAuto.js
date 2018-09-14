const fetchAuto = require("../../organizations/fetchAuto");

module.exports = {
    entity: fetchAuto,
    company: fetchAuto.name,
    website: fetchAuto.url,
    position: "Senior Software Developer",
    startDate: "2017-02-14",
    endDate: "2018-06-01",
    summary: "Got called back to Vancouver while travelling abroad by my former team lead at Yardi to help build out the first end-to-end solution for Canadians to buy, sell and finance private sale vehicles",
    highlights: [
        "Took a UI prototype to a fully integrated, production application in less than 6 months",
        "Rapidly iterated on new features and designs to drive user growth",
        "Implemented a comprehensive user tracking & analytics platform",
        "Designed and developed a serverless service platform",
        "Got asked to be their first employee while passing Sardinia on a container ship"
    ]
};
