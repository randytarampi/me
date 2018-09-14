const basics = require("./basics");

const fetchAuto = require("./work/fetchAuto");
const yardi = require("./work/yardi");
const pulseEnergy = require("./work/pulseEnergy");
const metroVancouver = require("./work/metroVancouver");
const sap = require("./work/sap");
const sfuWork = require("./work/sfu");

const sfuVolunteer = require("./volunteer/sfu");
const windermereCommunityPrograms = require("./volunteer/windermereCommunityPrograms");

const blog = require("./projects/blog");
const resume = require("./projects/resume");

const sfuEducation = require("./education/sfu");

module.exports = {
    basics,
    work: [
        fetchAuto,
        yardi,
        pulseEnergy,
        metroVancouver,
        sap,
        sfuWork
    ],
    volunteer: [
        sfuVolunteer,
        windermereCommunityPrograms
    ],
    projects: [
        blog,
        resume
    ],
    education: [
        sfuEducation
    ],
    awards: [],
    publications: [],
    skills: [
        {
            name: "Front end",
            level: "Master",
            keywords: [
                "ES6",
                "react",
                "redux",
                "i18n",
                "a11y",
                "User analytics",
                "sass",
                "User testing",
                "UI design",
                "Data visualization"
            ]
        },
        {
            name: "Back end",
            level: "Master",
            keywords: [
                "node.js",
                "Data architecture",
                "Serverless computing",
                "Performance tuning",
                "Microservices",
                "i18n",
                "Spring",
                "Postgres",
                "Redis",
                "Service architecture",
                "API security"
            ]
        },
        {
            name: "Operations",
            level: "Intermediate",
            keywords: [
                "AWS",
                "CloudFormation",
                "Chef",
                "Configuration as code",
                "Network security",
                "Fault tolerance",
                "Monitoring",
                "Alerting"
            ]
        },
        {
            name: "Data analysis",
            level: "Beginner",
            keywords: [
                "Excel",
                "VBA",
                "Python",
                "Jupyter Notebook",
                "R"
            ]
        }
    ],
    languages: [
        {
            language: "English",
            fluency: "Native"
        },
        {
            language: "Italian",
            fluency: "Beginner"
        },
        {
            language: "French",
            fluency: "Intermediate"
        }
    ],
    interests: [
        {
            name: "Auto racing",
            keywords: [
                "WEC",
                "WTSC",
                "F1",
                "IndyCar"
            ]
        },
        {
            name: "Photography",
            keywords: [
                "Landscapes",
                "Night",
                "Long exposures",
                "Events",
                "Weddings"
            ]
        },
        {
            name: "Food & drink",
            keywords: [
                "Comfort foods",
                "Baked goods",
                "Iced beverages"
            ]
        },
        {
            name: "People",
            keywords: [
                "That have stories to tell",
                "Who have a sense of humor",
                "That read this far down"
            ]
        }
    ],
    references: []
};
