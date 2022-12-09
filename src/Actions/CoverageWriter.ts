import { ActionConfiguration } from "../../config/ActionConfiguration";
import { Action, ExecutionStatus } from "./Action";

export class CoverageWriter implements Action {
	public constructor(
		private readonly config: ActionConfiguration
	) {
	}

	public async execute(): Promise<ExecutionStatus> {
		try {
			await this.config.storageAdapter.putCoverage({
				linesCoverage: this.config.linesCoverage,
				classCoverage: this.config.classCoverage,
				methodCoverage: this.config.methodCoverage,
			});
		} catch (err) {
			return ExecutionStatus.Failed;
		}

		return ExecutionStatus.Success;
	}

}