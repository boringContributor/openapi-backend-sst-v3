import type {
	APIGatewayProxyEventV2,
	APIGatewayProxyStructuredResultV2,
	Context as LambdaContext,
} from "aws-lambda";
import type { Context } from "openapi-backend";

export type HandlerParams = [Context, APIGatewayProxyEventV2?, LambdaContext?];
export type ApiHandler = (
	...params: HandlerParams
) => Promise<APIGatewayProxyStructuredResultV2>;

export const toApiResponse = (params: {
	body?: unknown;
	statusCode: number;
}): APIGatewayProxyStructuredResultV2 => {
	return {
		statusCode: params.statusCode,
		isBase64Encoded: false,
		...(params.body ? { body: JSON.stringify(params.body) } : {}),
	};
};
