const fetchAuto = require("../../organizations/fetchAuto");

module.exports = {
    entity: fetchAuto,
    name: "Slamscan",
    description: "A set of AWS Lambdas that scans files uploaded to an S3 bucket for viruses and other threats",
    highlights: [
        "My first production deployed Lambda 🎉",
        "What was a quick and dirty learning exercise back in Summer '17 is now a project I rewrite every year, just to see what's changed in the Node and AWS ecosystems",
    ],
    keywords: [
        "node.js",
        "serverless",
        "Docker",
        "AWS Lambda",
        "S3",
        "ClamAV",
    ],
    startDate: "2017-07-01",
    roles: [
        "👨‍💻"
    ],
    type: "Web service",
    url: "https://github.com/randytarampi/slamscan"
};
