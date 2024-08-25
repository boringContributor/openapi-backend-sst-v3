import { logger } from "@repo/common/powertools";
import { Resource } from "sst";
import { ddb } from "./aws-clients";

export namespace PetsService {
	export async function createPet(orgId: string, petId: string, name: string) {
		logger.info("Creating pet", { orgId, petId, name });
		await ddb.put({
			TableName: Resource.PetsTable.name,
			Item: {
				orgId,
				petId,
				name,
			},
		});
	}

	export async function getPets(orgId: string) {
		const response = await ddb.query({
			TableName: Resource.PetsTable.name,
			KeyConditionExpression: "orgId = :orgId",
			ExpressionAttributeValues: {
				":orgId": orgId,
			},
		});

		return response.Items ?? [];
	}
}
