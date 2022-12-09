import { ActionConfiguration } from "../../config/ActionConfiguration";
import { Coverage, CoverageDiff } from "../Adapters/Adapter";
import { CommentWriter } from "./CommentWriter";
import { Action, ExecutionStatus } from "./Action";

export class CoverageReader implements Action {
	public constructor(
		private readonly config: ActionConfiguration
	) {
	}

	public async execute(): Promise<ExecutionStatus> {
		const headCoverage: Coverage = await this.config.storageAdapter.pullCoverage();
		const coverage: Coverage = this.config.loadCoverage();

		const coverageDiff: CoverageDiff = {
			linesDiff: coverage.linesCoverage - headCoverage.linesCoverage,
			classDiff: coverage.classCoverage - headCoverage.classCoverage,
			methodDiff: coverage.methodCoverage - headCoverage.methodCoverage,
		}

		const commentWriter = new CommentWriter(
			this.config.pullRequest,
			this.config.token,
		);

		await commentWriter.write(
			coverageDiff,
			headCoverage,
			coverage,
		);

		return ExecutionStatus.Success;
	}
}