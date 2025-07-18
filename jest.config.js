/** @type {import("jest").Config} **/
export default {
	preset: "ts-jest",
	testEnvironment: "node",
	testMatch: ["<rootDir>/src/**/*.test.ts", "<rootDir>/__tests__/**/*.test.ts"],

	collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts", "!src/**/index.ts"],
	coverageDirectory: "coverage",
	coverageReporters: ["json", "lcov", "text", "clover"],
};
