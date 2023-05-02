import { ActionConfiguration } from "../../config/ActionConfiguration";
import { Coverage, CoverageDiff } from "../StorageAdapters/Adapter";
import { Action, ExecutionStatus } from "./Action";
import { CommentWriter } from "./CommentWriter";

export class CoverageReader implements Action {
	public constructor(
		private readonly config: ActionConfiguration,
	) {
	}

	public async execute(): Promise<ExecutionStatus> {
		const headCoverage: Coverage = await this.config.storageAdapter.pullCoverage();
		const coverage: Coverage = this.config.loadCoverage();

		const coverageDiff: CoverageDiff = {
			linesDiff: coverage.linesCoverage - headCoverage.linesCoverage,
			classDiff: coverage.classCoverage - headCoverage.classCoverage,
			methodDiff: coverage.methodCoverage - headCoverage.methodCoverage,
		};

		if (
			coverageDiff.linesDiff === 0
			&& coverageDiff.classDiff === 0
			&& coverageDiff.methodDiff === 0
		) {
			return ExecutionStatus.Success;
		}

		const commentWriter = new CommentWriter(
			this.config.pullRequest,
			this.config.token,
			this.config.repo,
			this.config.owner,
			coverageDiff,
			headCoverage,
			coverage,
		);

		await commentWriter.write();

		return ExecutionStatus.Success;
	}
}