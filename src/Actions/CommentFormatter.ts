import { Coverage, CoverageDiff } from "../Adapters/Adapter";

export class CommentFormatter {
	
	public constructor(
		private readonly coverageDiff: CoverageDiff,
		private readonly headCoverage: Coverage,
		private readonly coverage: Coverage
	) {
	}
	
	public writeCommentBody(
	): string {
		let comment = this.heading();

		comment += '<details>\n<summary>Coverage Report:</summary>\n\n';

		comment += this.linesCoverage();
		comment += this.methodCoverage();
		comment += this.classCoverage();

		comment += '</details>';

		return comment;
	}
	
	private heading(): string {
		let heading = '```diff\n';

		heading += ((this.coverageDiff.linesDiff > 0) ? '+' : '-') + ' lines: from ' + this.headCoverage.linesCoverage.toFixed(2) + '% to ' + this.coverage.linesCoverage.toFixed(2) +'% (' + ((this.coverageDiff.linesDiff > 0) ? '+' : '-') + this.coverageDiff.linesDiff.toFixed(2) + '%)\n';
		heading += '- deze moet ik nog fixen huil huil\n';
		heading += '```\n\n';

		return heading;
	}
	
	private linesCoverage(): string {
		let linesCoverage = 'Lines coverage:\n```diff\n';
		if (this.coverageDiff.linesDiff > 0) {
			linesCoverage += '+ the line coverage has gone up by ' + this.coverageDiff.linesDiff.toFixed(2) + '%\n';
			linesCoverage += '+ from ' + this.headCoverage.linesCoverage.toFixed(2)  + '% to ' + this.coverage.linesCoverage.toFixed(2) + '%\n';
		} else if (this.coverageDiff.linesDiff === 0) {
			linesCoverage += '! the lines coverage has stayed the same\n';
			linesCoverage += '! the coverage is ' + this.coverage.linesCoverage + '%\n';
		} else {
			linesCoverage += '- the line coverage has gone down by ' + this.coverageDiff.linesDiff.toFixed(2) + '%\n';
			linesCoverage += '- from ' + this.headCoverage.linesCoverage.toFixed(2)  + '% to ' + this.coverage.linesCoverage.toFixed(2) + '%\n';
		}
		linesCoverage += '```\n\n';

		return linesCoverage;
	}
	
	private methodCoverage(): string {
		let methodCoverage = 'Method coverage:\n```diff\n';

		if (this.coverageDiff.methodDiff > 0) {
			methodCoverage += '+ the method coverage has gone up by ' + this.coverageDiff.methodDiff.toFixed(2) + '%\n';
			methodCoverage += '+ from ' + this.headCoverage.methodCoverage.toFixed(2)  + '% to ' + this.coverage.methodCoverage.toFixed(2) + '%\n';
		} else if (this.coverageDiff.methodDiff === 0) {
			methodCoverage += '! the method coverage has stayed the same\n';
			methodCoverage += '! the coverage is ' + this.coverage.methodCoverage + '%\n';
		} else {
			methodCoverage += '- the method coverage has gone down by ' + this.coverageDiff.methodDiff.toFixed(2) + '%\n';
			methodCoverage += '- from ' + this.headCoverage.methodCoverage.toFixed(2)  + '% to ' + this.coverage.methodCoverage.toFixed(2) + '%\n';
		}

		methodCoverage += '```\n\n';

		return methodCoverage;
	}
	
	private classCoverage(): string {
		let classCoverage = 'Class coverage:\n```diff\n';

		if (this.coverageDiff.classDiff > 0) {
			classCoverage += '+ the class coverage has gone up by ' + this.coverageDiff.classDiff.toFixed(2) + '%\n';
			classCoverage += '+ from ' + this.headCoverage.classCoverage.toFixed(2)  + '% to ' + this.coverage.classCoverage.toFixed(2) + '%\n';
		} else if (this.coverageDiff.classDiff === 0) {
			classCoverage += '! the class coverage has stayed the same\n';
			classCoverage += '! the coverage is ' + this.coverage.classCoverage + '%\n';
		} else {
			classCoverage += '- the class coverage has gone down by ' + this.coverageDiff.classDiff.toFixed(2) + '%\n';
			classCoverage += '- from ' + this.headCoverage.classCoverage.toFixed(2)  + '% to ' + this.coverage.classCoverage.toFixed(2) + '%\n';
		}

		classCoverage += '```\n\n'

		return classCoverage;
	}
}