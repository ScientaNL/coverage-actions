import { setFailed } from "@actions/core";
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { fromEnv } from "@aws-sdk/credential-providers";
import { DynamoDBDocumentClient, GetCommand, GetCommandOutput, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { Adapter, Coverage } from "./Adapter";

export class DynamoDBAdapter implements Adapter {
	private client: DynamoDBDocumentClient | null = null;

	public async putCoverage(coverage: Coverage): Promise<void> {
		const documentClient = this.getDynamoDbDocumentClient();

		await documentClient.send(
			new UpdateCommand({
				TableName: "coverage-storage",
				Key: {
					id: process.env.COVERAGE_STORAGE_ID,
				},
				ExpressionAttributeNames: {
					"#l": "linesCoverage",
					"#m": "methodCoverage",
					"#c": "classCoverage",
				},
				UpdateExpression: "set coverage.#l = :l, coverage.#m = :m, coverage.#c = :c",
				ExpressionAttributeValues: {
					":l": coverage.linesCoverage,
					":m": coverage.methodCoverage,
					":c": coverage.classCoverage,
				},
			}),
		);
	}

	public async pullCoverage(): Promise<Coverage> {
		const data: GetCommandOutput = await this.getDynamoDbDocumentClient().send(
			new GetCommand({
					TableName: "coverage-storage",
					Key: {
						id: process.env.COVERAGE_STORAGE_ID,
					},
				},
			),
		);

		if (!data.Item || !this.isCoverageType(data.Item?.coverage)) {
			const error = new Error('The data from the DynamoDB response is invalid');

			setFailed(error);
			throw error;
		}

		const coverage: Coverage = {
			// @ts-ignore
			linesCoverage: parseFloat(data.Item.coverage.linesCoverage),
			// @ts-ignore
			classCoverage: parseFloat(data.Item.coverage.classCoverage),
			// @ts-ignore
			methodCoverage: parseFloat(data.Item.coverage.methodCoverage),
		};

		return coverage;
	}

	private readonly isCoverageType = (commandOutput: object): commandOutput is Coverage => {
		return ('linesCoverage' in commandOutput && 'classCoverage' in commandOutput && 'methodCoverage' in commandOutput);
	};

	private getDynamoDbDocumentClient(): DynamoDBDocumentClient {
		if (this.client) {
			return this.client;
		}

		return this.client = DynamoDBDocumentClient.from(
			new DynamoDBClient({
				credentials: fromEnv(),
				region: process.env.AWS_REGION,
			}),
		);
	}
}