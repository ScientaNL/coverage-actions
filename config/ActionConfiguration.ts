import { getInput, setFailed } from "@actions/core";
import { Adapter } from "../src/Adapters/Adapter";
import { AdapterFactory } from "../src/Factory/AdapterFactory";

export type ActionType = "read" | "save";

export class ActionConfiguration {
	private constructor(
		public readonly token: string,
		public readonly pullRequest: number,
		public readonly coverage: number,
		public readonly actionType: ActionType,
		public readonly storageAdapter: Adapter,
	) {
	}

	public static loadConfiguration(): ActionConfiguration {
		return new ActionConfiguration(
			getInput('token'),
			parseInt(getInput('pr_number')),
			parseFloat(getInput('coverage')),
			ActionConfiguration.verifyInputActionType(getInput('action_type')),
			AdapterFactory.createAdapter(getInput('storage_adapter')),
		);
	}

	private static verifyInputActionType(actionInput: string): ActionType {
		if (!ActionConfiguration.isActionType(actionInput)){
			const error =  new Error('The input is not part of the allowed input action types, the allowed types are, read, readAndSave and save');

			setFailed(error);
			throw error;
		}

		return actionInput;
	}

	private static isActionType(actionInput: string): actionInput is ActionType {
		return ["read", "readAndSave", "save"].includes(actionInput);
	}
}