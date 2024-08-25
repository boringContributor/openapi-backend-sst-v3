import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		coverage: {
			include: ["src/**/*"],
			provider: "v8",
			reporter: ["text-summary", "html", "cobertura"],
		},
		deps: {
			// NOTE: To ensure symlinked local packages are not double-compiled,
			// tell vitest about them explicitly
			moduleDirectories: ["node_modules", path.resolve("../../packages")],
		},
		fileParallelism: false,
		globals: true,
		outputFile: "test-report.xml",
		reporters: ["default", "junit"],
		silent: true,
		watch: false,
	},
});
