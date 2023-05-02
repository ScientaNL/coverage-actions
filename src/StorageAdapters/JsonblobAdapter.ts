import axios from "axios";
import { Adapter, Coverage } from "./Adapter";

export class JsonblobAdapter implements Adapter {
	private readonly JSONBLOB_URL: string = 'https://jsonblob.com/api/';

	public async pullCoverage(): Promise<Coverage> {
		return (await axios.get<Coverage>(this.JSONBLOB_URL + process.env.JSONBLOB_ID)).data;
	}

	public async putCoverage(coverage: Coverage): Promise<void> {
		await axios.put(this.JSONBLOB_URL + process.env.JSONBLOB_ID, coverage);
	}

}