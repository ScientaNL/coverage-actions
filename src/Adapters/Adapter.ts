export type Coverage = {
	methodCoverage: number;
	classCoverage: number;
	linesCoverage: number;
}

export type CoverageDiff = {
	methodDiff: number;
	classDiff: number;
	linesDiff: number;
}

export interface Adapter {
	pullCoverage(): Promise<Coverage>;

	putCoverage(coverage: Coverage): Promise<void>;
}