import { getOctokit } from "@actions/github";
import { GitHub } from "@actions/github/lib/utils";
import { Coverage, CoverageDiff } from "../Adapters/Adapter";

export class CommentWriter {
	private octokit: InstanceType<typeof GitHub>;

	public constructor(
		private readonly pullRequest: number,
		private readonly token: string,
		private readonly repo: string,
		private readonly owner: string,
	) {
		this.octokit = getOctokit(this.token);
	}

	public async write(
		coverageDiff: CoverageDiff,
		headCoverage: Coverage,
		coverage: Coverage
	): Promise<void> {
		const comments = await this.octokit.rest.issues.listComments({
			owner: this.owner,
			repo: this.repo,
			issue_number: this.pullRequest,
		});

		for (const comment of Object.values(comments.data)) {
			if (comment.body?.includes("Coverage report:")) {
				await this.update(
					coverageDiff,
					headCoverage,
					coverage,
					comment.id
				);
				return;
			}
		}

		await this.create(
			coverageDiff,
			headCoverage,
			coverage
		);
	}

	private async create(
		coverageDiff: CoverageDiff,
		headCoverage: Coverage,
		coverage: Coverage
	): Promise<void> {
		// TODO: this needs to go in a commment formatter
		let comment: string = 'Coverage report:\n\n Lines coverage:\n```diff\n';
		if (coverageDiff.linesDiff > 0) {
			comment += '+ the line coverage has gone up by ' + coverageDiff.linesDiff.toFixed(2) + '%\n';
			comment += '+ from ' + headCoverage.linesCoverage.toFixed(2)  + '% to ' + coverage.linesCoverage.toFixed(2) + '%\n';
		} else if (coverageDiff.linesDiff === 0) {
			comment += '! the lines coverage has stayed the same\n';
			comment += '! the coverage is ' + coverage.linesCoverage + '%\n';
		} else {
			comment += '- the line coverage has gone down by ' + coverageDiff.linesDiff.toFixed(2) + '%\n';
			comment += '- from ' + headCoverage.linesCoverage.toFixed(2)  + '% to ' + coverage.linesCoverage.toFixed(2) + '%\n';
		}
		comment += '```\n\n';
		comment += 'Method coverage:\n```diff\n';

		if (coverageDiff.methodDiff > 0) {
			comment += '+ the method coverage has gone up by ' + coverageDiff.methodDiff.toFixed(2) + '%\n';
			comment += '+ from ' + headCoverage.methodCoverage.toFixed(2)  + '% to ' + coverage.methodCoverage.toFixed(2) + '%\n';
		} else if (coverageDiff.methodDiff === 0) {
			comment += '! the method coverage has stayed the same\n';
			comment += '! the coverage is ' + coverage.methodCoverage + '%\n';
		} else {
			comment += '- the method coverage has gone down by ' + coverageDiff.methodDiff.toFixed(2) + '%\n';
			comment += '- from ' + headCoverage.methodCoverage.toFixed(2)  + '% to ' + coverage.methodCoverage.toFixed(2) + '%\n';
		}

		comment += '```\n\n';
		comment += 'Class coverage:\n```diff\n';

		if (coverageDiff.classDiff > 0) {
			comment += '+ the class coverage has gone up by ' + coverageDiff.classDiff.toFixed(2) + '%\n';
			comment += '+ from ' + headCoverage.classCoverage.toFixed(2)  + '% to ' + coverage.classCoverage.toFixed(2) + '%\n';
		} else if (coverageDiff.classDiff === 0) {
			comment += '! the class coverage has stayed the same\n';
			comment += '! the coverage is ' + coverage.classCoverage + '%\n';
		} else {
			comment += '- the class coverage has gone down by ' + coverageDiff.classDiff.toFixed(2) + '%\n';
			comment += '- from ' + headCoverage.classCoverage.toFixed(2)  + '% to ' + coverage.classCoverage.toFixed(2) + '%\n';
		}

		comment += '```'

		// @ts-ignore
		await this.octokit.rest.issues.createComment({
			owner: this.owner,
			repo: this.repo,
			issue_number: this.pullRequest,
			body: comment
		});
	}

	private async update(
		coverageDiff: CoverageDiff,
		headCoverage: Coverage,
		coverage: Coverage,
		commentId: number
	): Promise<void> {
		// TODO: this needs to go in a commment formatter
		let comment: string = 'Coverage report:\n\n Lines coverage:\n```diff\n';
		if (coverageDiff.linesDiff > 0) {
			comment += '+ the line coverage has gone up by ' + coverageDiff.linesDiff.toFixed(2) + '%\n';
			comment += '+ from ' + headCoverage.linesCoverage.toFixed(2)  + '% to ' + coverage.linesCoverage.toFixed(2) + '%\n';
		} else if (coverageDiff.linesDiff === 0) {
			comment += '! the lines coverage has stayed the same\n';
			comment += '! the coverage is ' + coverage.linesCoverage + '%\n';
		} else {
			comment += '- the line coverage has gone down by ' + coverageDiff.linesDiff.toFixed(2) + '%\n';
			comment += '- from ' + headCoverage.linesCoverage.toFixed(2)  + '% to ' + coverage.linesCoverage.toFixed(2) + '%\n';
		}
		comment += '```\n\n';
		comment += 'Method coverage:\n```diff\n';

		if (coverageDiff.methodDiff > 0) {
			comment += '+ the method coverage has gone up by ' + coverageDiff.methodDiff.toFixed(2) + '%\n';
			comment += '+ from ' + headCoverage.methodCoverage.toFixed(2)  + '% to ' + coverage.methodCoverage.toFixed(2) + '%\n';
		} else if (coverageDiff.methodDiff === 0) {
			comment += '! the method coverage has stayed the same\n';
			comment += '! the coverage is ' + coverage.methodCoverage + '%\n';
		} else {
			comment += '- the method coverage has gone down by ' + coverageDiff.methodDiff.toFixed(2) + '%\n';
			comment += '- from ' + headCoverage.methodCoverage.toFixed(2)  + '% to ' + coverage.methodCoverage.toFixed(2) + '%\n';
		}

		comment += '```\n\n';
		comment += 'Class coverage:\n```diff\n';

		if (coverageDiff.classDiff > 0) {
			comment += '+ the class coverage has gone up by ' + coverageDiff.classDiff.toFixed(2) + '%\n';
			comment += '+ from ' + headCoverage.classCoverage.toFixed(2)  + '% to ' + coverage.classCoverage.toFixed(2) + '%\n';
		} else if (coverageDiff.classDiff === 0) {
			comment += '! the class coverage has stayed the same\n';
			comment += '! the coverage is ' + coverage.classCoverage + '%\n';
		} else {
			comment += '- the class coverage has gone down by ' + coverageDiff.classDiff.toFixed(2) + '%\n';
			comment += '- from ' + headCoverage.classCoverage.toFixed(2)  + '% to ' + coverage.classCoverage.toFixed(2) + '%\n';
		}

		comment += '```'

		await this.octokit.rest.issues.updateComment({
			owner: this.owner,
			repo: this.repo,
			comment_id: commentId,
			body: comment
		});
	}
}