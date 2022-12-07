import { getInput, setFailed } from "@actions/core";

export type ActionType = "read" | "readAndSave" | "save";

export class ActionConfiguration {
	public readonly token: string;
	public readonly pullRequest: number;
	public readonly coverage: number;
	public readonly actionType: ActionType;

	constructor() {
		this.token = getInput('token');
		this.pullRequest = parseInt(getInput('pr_number'));
		this.coverage = parseFloat(getInput('coverage'));
		this.actionType = this.getInputActionType('action_type');
	}

	private getInputActionType(inputIdentifier: string): ActionType {
		const actionInput = getInput(inputIdentifier);

		if (!this.isActionType(actionInput)){
			const error =  new Error('The input is not part of the allowed input action types, the allowed types are, read, readAndSave and save');

			setFailed(error);
			throw error;
		}

		return actionInput;
	}

	private isActionType(actionInput: string): actionInput is ActionType {
		return ["read", "readAndSave", "save"].includes(actionInput);
	}
}