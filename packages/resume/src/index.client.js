import {readFileSync} from "fs";

export * from "./lib/index.js";

export const defaultResumeJson = JSON.parse(readFileSync("src/resumes/resume.json", "utf8"));
