import { getOctokit } from "@actions/github";
import { Coverage, CoverageDiff } from "../Adapters/Adapter";

export class CommentWriter {
	public constructor(
		private readonly pullRequest: number,
		private readonly token: string,
	) {
	}

	public async write(
		coverageDiff: CoverageDiff,
		headCoverage: Coverage,
		coverage: Coverage
	): Promise<void> {
		// format
		const commment: string = 'test';

		// @ts-ignore
		await getOctokit(this.token).rest.issues.createComment({
			owner: 'ScientaNL',
			repo: 'scienta',
			issue_number: this.pullRequest,
			body: commment
		});
	}

}