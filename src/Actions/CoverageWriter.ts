import { ActionConfiguration } from "../../config/ActionConfiguration";
import { Coverage } from "../StorageAdapters/Adapter";
import { Action, ExecutionStatus } from "./Action";

export class CoverageWriter implements Action {
	public constructor(
		private readonly config: ActionConfiguration
	) {
	}

	public async execute(): Promise<ExecutionStatus> {
		const coverage: Coverage = this.config.loadCoverage();

		try {
			await this.config.storageAdapter.putCoverage({
				linesCoverage: coverage.linesCoverage,
				classCoverage: coverage.classCoverage,
				methodCoverage: coverage.methodCoverage,
			});
		} catch (err) {
			return ExecutionStatus.Failed;
		}

		return ExecutionStatus.Success;
	}

}