import { logger } from "@repo/common/powertools";
import type { Handler } from "aws-lambda";
import type { Request } from "openapi-backend";
import { createAPI } from "./openapi";
import definition from './openapi/definition.json'

const headers = {
	"content-type": "application/json",
	"access-control-allow-origin": "*",
};

const api = createAPI(definition as unknown as string);

api.register({
	getPets: await import("./pets/pets.handler").then((mod) => mod.getPets),
	getPetById: await import("./pets/pets.handler").then((mod) => mod.getPetById),
	createPet: await import("./pets/pets.handler").then((mod) => mod.createPet),
});

api.init();

export const handler: Handler = async (event, context) => {
	if (event.rawPath === "/openapi.json") {
		return {
			statusCode: 200,
			body: JSON.stringify(definition),
			headers,
		};
	}

	logger.debug("API Handler", { event, context });

	return await api.handleRequest(
		{
			method: event.requestContext.http.method,
			path: event.rawPath,
			query: event.rawQueryString,
			body: event.body,
			headers: event.headers as Request["headers"],
		},
		event,
		context,
	);
};
