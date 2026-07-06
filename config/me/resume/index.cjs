const basics = require("./basics/index.cjs");

const deed = require("./work/deed.cjs");
const smunch = require("./work/smunch.cjs");
const fetchAuto = require("./work/fetchAuto.cjs");
const yardi = require("./work/yardi.cjs");
const pulseEnergy = require("./work/pulseEnergy.cjs");
const metroVancouver = require("./work/metroVancouver.cjs");
const sap = require("./work/sap.cjs");
const sfuWork = require("./work/sfu.cjs");

const sfuVolunteer = require("./volunteer/sfu.cjs");
const windermereCommunityPrograms = require("./volunteer/windermereCommunityPrograms.cjs");

const blog = require("./projects/blog.cjs");
const letter = require("./projects/letter.cjs");
const pseudoimage = require("./projects/pseudoimage.cjs");
const pseudolocalize = require("./projects/pseudolocalize.cjs");
const resume = require("./projects/resume.cjs");
const slamscan = require("./projects/slamscan.cjs");

const sfuEducation = require("./education/sfu.cjs");

module.exports = {
    basics,
    work: [
        deed,
        smunch,
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
        letter,
        resume,
        slamscan,
        blog,
        pseudoimage,
        pseudolocalize,
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
                "ESNext",
                "TypeScript",
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
                "Kotlin",
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
                "Docker",
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
