import { info, setFailed } from "@actions/core";
import { ActionConfiguration } from "../config/ActionConfiguration";
import { ExecutionStatus } from "./Actions/Action";
import { CoverageReader } from "./Actions/CoverageReader";
import { CoverageWriter } from "./Actions/CoverageWriter";

class CoverageActions {
	constructor(
		private readonly config: ActionConfiguration
	) {
		this.bootstrap();
	}

	private async bootstrap(): Promise<void> {
		const executionStatus = await this.run();

		if (executionStatus === ExecutionStatus.Failed) {
			setFailed('The coverage actions have failed');
			return;
		}

		info('The coverage actions have succeeded');
		return;
	}

	private async run(): Promise<ExecutionStatus> {
		if (this.config.actionType === "read") {
			const coverageReader = new CoverageReader(this.config);
			return await coverageReader.execute();
		}

		const coverageWriter = new CoverageWriter(this.config);
		return await coverageWriter.execute();
	}
}

export default new CoverageActions(
	ActionConfiguration.loadConfiguration(),
);
