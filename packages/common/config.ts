import z from "zod";

// env necessary for deployment
const infraEnv = z.object({
	LOG_LEVEL: z.enum(["INFO", "DEBUG", "WARN", "ERROR"]).default("INFO"),
});

// env necessary for runtime
const runtimeEnv = infraEnv.extend({
	SOME_LAMBDA_NAME: z.string(),
});

export const getInfraConfig = () => infraEnv.parse(process.env);
export const getRuntimeConfig = () => runtimeEnv.parse(process.env);
