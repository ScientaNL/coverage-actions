export type Coverage = {
	methodCoverage: number;
	classCoverage: number;
	linesCoverage: number;
}

export interface Adapter {
	pullCoverage(): Promise<Coverage>;

	putCoverage(coverage: Coverage): Promise<void>;
}