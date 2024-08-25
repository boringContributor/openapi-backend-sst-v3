import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocument } from "@aws-sdk/lib-dynamodb";

const region = "eu-central-1";
const dynamoClient = new DynamoDB({ region });

export const ddb = DynamoDBDocument.from(dynamoClient, {
	marshallOptions: {
		removeUndefinedValues: true,
	},
});
