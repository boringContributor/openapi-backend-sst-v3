export const table = new sst.aws.Dynamo("PetsTable", {
	fields: {
		orgId: "string",
		petId: "string",
	},
	primaryIndex: { hashKey: "orgId", rangeKey: "petId" },
});
