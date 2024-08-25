import { PetsService } from "@monorepo-template/core";
import { type ApiHandler, toApiResponse } from "../../utils";
import { useBody, useParam } from "../openapi/utils";
import type { Components } from '@repo/common/openapi'

type Pet = Components.Schemas.Pet

export const getPets: ApiHandler = async (c) => {
	const pets = await PetsService.getPets("org-1");

	return toApiResponse({
		statusCode: 200,
		body: { pets },
	});
};

export const getPetById: ApiHandler = async (c) => {
	const petId = useParam(c, "id");

	const pets = await PetsService.getPets("org-1");

	return toApiResponse({
		statusCode: 200,
		body: { pet: pets[0] },
	});
};

export const createPet: ApiHandler = async (c) => {
	const body = useBody<Pet>(c)

	await PetsService.createPet("org-1", "pet-1", body.type);

	return toApiResponse({
		statusCode: 200,
		body,
	});
};
