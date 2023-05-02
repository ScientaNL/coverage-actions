import { info, setFailed } from "@actions/core";
import { ActionConfiguration } from "../config/ActionConfiguration";
import { ExecutionStatus } from "./Actions/Action";
import { CoverageReader } from "./Actions/CoverageReader";
import { CoverageWriter } from "./Actions/CoverageWriter";

const main = async () => {
	const executionStatus = await run(
		ActionConfiguration.loadConfiguration(),
	);

	if (executionStatus === ExecutionStatus.Failed) {
		setFailed('The coverage actions have failed');
		return;
	}

	info('The coverage actions have succeeded');
	return;
};

async function run(config: ActionConfiguration): Promise<ExecutionStatus> {
	if (config.actionType === "read") {
		const coverageReader = new CoverageReader(config);
		return await coverageReader.execute();
	}

	const coverageWriter = new CoverageWriter(config);
	return await coverageWriter.execute();
}

main();