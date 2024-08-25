import type { EpilotAuthorizerContextV2 } from "@epilot/custom-authorizer";
import type * as Lambda from "aws-lambda";
import * as OpenAPIBackend from "openapi-backend";
import type { ParsedRequest } from "openapi-backend";

export const ORG_ID = "unknown";

export const createLambdaHttpEvent = (
	overrides: Partial<Lambda.APIGatewayProxyEventV2> = {},
): Lambda.APIGatewayProxyEventV2 => ({
	version: "2.0",
	routeKey: "$default",
	rawPath: "/",
	rawQueryString: "",
	body: "Hello from API Gateway",
	isBase64Encoded: false,
	stageVariables: {},
	pathParameters: {},
	cookies: [],
	...overrides,
	headers: {
		accept: "application/json",
		...overrides.headers,
	},
	requestContext: createLambdaRequestContext(overrides.requestContext),
});

type ApiGwProxyEventV2 = Lambda.APIGatewayProxyEventV2["requestContext"] & {
	authorizer?: EpilotAuthorizerContextV2;
};

export const createLambdaRequestContext = (
	overrides: Partial<ApiGwProxyEventV2> = {},
): ApiGwProxyEventV2 => ({
	accountId: "123456789012",
	apiId: "api-id",
	domainName: "id.execute-api.us-east-1.amazonaws.com",
	domainPrefix: "id",
	http: {
		method: "POST",
		path: "/",
		protocol: "HTTP/1.1",
		sourceIp: "IP",
		userAgent: "agent",
	},
	requestId: "id",
	routeKey: "$default",
	stage: "$default",
	time: "12/Mar/2020:19:03:58 +0000",
	timeEpoch: 1583348638390,
	...overrides,
});

export const createLambdaContext = (
	overrides: Partial<Lambda.Context> = {},
): Lambda.Context => ({
	callbackWaitsForEmptyEventLoop: true,
	functionName: "Function",
	functionVersion: "1",
	invokedFunctionArn:
		"arn:aws:lambda:us-east-2:123456789012:function:my-function:1",
	memoryLimitInMB: "128",
	awsRequestId: "123456789012",
	logGroupName: "MyFunction-G73W0L3SMKMB",
	logStreamName: "",
	identity: undefined,
	clientContext: undefined,
	getRemainingTimeInMillis: () => 0,
	done: () => true,
	fail: () => true,
	succeed: () => true,
	...overrides,
});

export const createOpenAPIContext = (
	overrides: Partial<OpenAPIBackend.Context> = {},
): OpenAPIBackend.Context => ({
	api: new OpenAPIBackend.default({ definition: "./openapi.yml" }),
	request: createParsedRequest(overrides.request),
	operation: {
		operationId: "operationId",
		path: "/",
		method: "get",
	},
	validation: {
		valid: true,
	},
	security: {},
	response: null,
	...overrides,
});

export const createParsedRequest = (
	overrides: Partial<ParsedRequest> = {},
): ParsedRequest => ({
	params: {},
	headers: {},
	cookies: {},
	query: {},
	method: "get",
	path: "/",
	requestBody: null,
	...overrides,
});

export const createEventBridgeEvent = <
	EventName extends string = "TestEvent",
	T = unknown,
>(
	overrides: Partial<Lambda.EventBridgeEvent<EventName, T>> = {},
): Lambda.EventBridgeEvent<EventName, T> => ({
	version: "0",
	id: "6a7e8feb-b491-4cf7-a9f1-bf3703467718",
	"detail-type": overrides["detail-type"] as EventName,
	source: "aws.events",
	account: "123456789012",
	time: "2020-01-01T00:00:00Z",
	region: "eu-central-1",
	resources: ["arn:aws:events:us-east-1:123456789012:rule/ExampleRule"],
	detail: {} as T,
	...overrides,
});
