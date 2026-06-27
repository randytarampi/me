// @ts-check
import {createMetrics} from "react-metrics";
import metricsConfig from "./config.js";

/** The shared metrics config. */
export const config = metricsConfig;

/** The configured metrics instance. */
export const metrics = createMetrics(config);

/** @type {typeof metrics} */
export default metrics;
