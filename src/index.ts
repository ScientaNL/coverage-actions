import { ActionConfiguration } from "./config/ActionConfiguration";

class CoverageActions {
	constructor(
		private readonly config: ActionConfiguration
	) {
	}
}

export default new CoverageActions(
	new ActionConfiguration(),
);
