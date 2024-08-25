import { Logger } from "@aws-lambda-powertools/logger";
import { getRuntimeConfig } from "./config";

const config = getRuntimeConfig();

export const logger = new Logger({
	serviceName: config.SERVICE_NAME,
});
