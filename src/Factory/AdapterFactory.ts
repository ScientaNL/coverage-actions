import { setFailed } from "@actions/core";
import { Adapter } from "../adapters/Adapter";
import { DynamoDBAdapter } from "../adapters/DynamoDBAdapter";
import { JsonblobAdapter } from "../adapters/JsonblobAdapter";

export type AdapterType = "Jsonblob" | "DynamoDB";

export class AdapterFactory {
	private static adapterMap = {
		Jsonblob: JsonblobAdapter,
		DynamoDB: DynamoDBAdapter,
	}

	public static createAdapter(adapterType: string): Adapter {
		if (!this.isValidAdapterType(adapterType)) {
			const error = new Error(`${adapterType} is not a valid adapter type, valid adapter types are Jsonblob and DynamoDB`);

			setFailed(error);
			throw error;
		}

		return new this.adapterMap[adapterType]();
	}

	private static isValidAdapterType(adapterType: string): adapterType is AdapterType {
		return ["DynamoDB", "Jsonblob"].includes(adapterType);
	}

}