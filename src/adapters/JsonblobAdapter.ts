import axios  from "axios";
import { Adapter, Coverage } from "./Adapter";

export class JsonblobAdapter implements Adapter {
	private readonly JSONBLOB_URL: string = 'https://jsonblob.com/api/';

	public constructor(
		private readonly jsonblobId: string,
	) {
	}

	public async pullCoverage(): Promise<Coverage> {
		 return (await axios.get<Coverage>(`https://jsonblob.com/api/${this.jsonblobId}`)).data;
	}

	public async putCoverage(coverage: Coverage): Promise<void> {
		await axios.put(this.JSONBLOB_URL + this.jsonblobId, coverage);
	}

}