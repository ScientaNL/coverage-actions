export enum ExecutionStatus {
	Failed = 'FAILED',
	Success = 'SUCCESS'
}

export interface Action {
	execute(): Promise<ExecutionStatus>;
}