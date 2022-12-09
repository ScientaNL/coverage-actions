import { getOctokit } from "@actions/github";
import { GitHub } from "@actions/github/lib/utils";
import { Coverage, CoverageDiff } from "../Adapters/Adapter";
import { CommentFormatter } from "./CommentFormatter";

export class CommentWriter {
	private octokit: InstanceType<typeof GitHub>;
	private commentFormatter: CommentFormatter;


	public constructor(
		private readonly pullRequest: number,
		private readonly token: string,
		private readonly repo: string,
		private readonly owner: string,
		private readonly coverageDiff: CoverageDiff,
		private readonly headCoverage: Coverage,
		private readonly coverage: Coverage,
	) {
		this.octokit = getOctokit(this.token);

		this.commentFormatter = new CommentFormatter(
			this.coverageDiff,
			this.headCoverage,
			this.coverage,
		);
	}

	public async write(): Promise<void> {
		const commentBody = this.commentFormatter.writeCommentBody();

		const comments = await this.octokit.rest.issues.listComments({
			owner: this.owner,
			repo: this.repo,
			issue_number: this.pullRequest,
		});

		for (const comment of Object.values(comments.data)) {
			if (comment.body?.includes("Coverage report:")) {
				await this.update(
					commentBody,
					comment.id,
				);
				return;
			}
		}

		await this.create(
			commentBody,
		);
	}

	private async create(
		comment: string,
	): Promise<void> {
		// @ts-ignore
		await this.octokit.rest.issues.createComment({
			owner: this.owner,
			repo: this.repo,
			issue_number: this.pullRequest,
			body: comment,
		});
	}

	private async update(
		comment: string,
		commentId: number,
	): Promise<void> {
		await this.octokit.rest.issues.updateComment({
			owner: this.owner,
			repo: this.repo,
			comment_id: commentId,
			body: comment
		});
	}
}