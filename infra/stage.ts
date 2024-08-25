export const stage = ["prod", "staging"].includes($app.stage)
	? $app.stage
	: "dev";
