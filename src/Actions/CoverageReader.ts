import { ActionConfiguration } from "../../config/ActionConfiguration";
import { Action, ExecutionStatus } from "./Action";

export class CoverageReader implements Action {
	public constructor(
		private readonly config: ActionConfiguration
	) {
	}

	public async execute(): Promise<ExecutionStatus> {
		return ExecutionStatus.Success;
	}
}