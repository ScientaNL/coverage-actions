import { ActionConfiguration } from "../../config/ActionConfiguration";
import { Coverage, CoverageDiff } from "../StorageAdapters/Adapter";
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
			this.config.repo,
			this.config.owner,
			coverageDiff,
			headCoverage,
			coverage
		);

		await commentWriter.write();

		return ExecutionStatus.Success;
	}
}