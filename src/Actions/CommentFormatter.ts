import { Coverage, CoverageDiff } from "../StorageAdapters/Adapter";

type CoverageType = 'lines' | 'method' | 'class';

export class CommentFormatter {

	public static readonly CommentIdentifier: string = "coverage:";

	public constructor(
		private readonly coverageDiff: CoverageDiff,
		private readonly headCoverage: Coverage,
		private readonly coverage: Coverage,
	) {
	}

	public writeCommentBody(): string {
		//heading
		let comment = this.generateMarkdownDiff('lines');
		comment += `\n`;

		// summary
		comment += `<details>\n<summary>Coverage Report:</summary>\n\n`;
		for (const type of ['lines', 'method', 'class'] as CoverageType[]) {
			comment += `${type} coverage: \n`;
			comment += this.generateMarkdownDiff(type);
			comment += `\n`;
		}
		comment += '</details>';

		return comment;
	}

	private generateMarkdownDiff = (type: CoverageType): string => {
		const [from, to, diff] = [
			this.headCoverage[`${type}Coverage`],
			this.coverage[`${type}Coverage`],
			this.coverageDiff[`${type}Diff`],
		];
		return `
\`\`\`diff
${diff > 0 ? `+ the ${type} coverage went up` : `- the ${type} coverage went down`}
${diff > 0 ? '+' : '-'} ${type}: from ${from.toFixed(2)}% to ${to.toFixed(2)}% (${diff.toFixed(2)}%)
\`\`\`
	`;
	};
}