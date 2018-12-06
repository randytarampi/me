import {createMetrics} from "react-metrics";
import metricsConfig from "./config";

export const config = metricsConfig;

export const metrics = createMetrics(config);

export default metrics;
