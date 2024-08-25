import { PetsService } from "../";

test("Hello test", async () => {
	const pets = await PetsService.getPets("org-1");
	expect(pets.length).toEqual(1);
});
