import { getInfraConfig } from "@repo/common/config";
import { table } from "./table";

const config = getInfraConfig();
const useDomain = () => {
	if ($app.stage === "staging") {
		return "pets.example.com";
	}

	if ($app.stage === "prod") {
		return "pets.example.com";
	}

	return "pets.example.com";
};

export const restApi = new sst.aws.ApiGatewayV2("api", {
	domain: {
		name: useDomain()
	},
});

restApi.route("ANY /{proxy+}", {
	handler: "packages/functions/src/api/api.handler",
	link: [table],
	environment: config
});
