import { LossImportResponse } from "./models/LossImportResponse";
import { PseudoCategoryGroupsResponse } from "./models/PseudoCategoryGroupsResponse";

export class BackendApi {
    private backendUrl: string;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;
    }

    async httpCall<T>(url: string): Promise<T> {
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }

    async fetchLossImportData() {
        const data = await this.httpCall<LossImportResponse>(
            this.backendUrl + "/lossImportData"
        );
        return data;
    }


    async fetchPseudoCategoryData() {
        const data = await this.httpCall<PseudoCategoryGroupsResponse>(
            this.backendUrl + "/pseudoCategoryGroups"
        );
        return data;
    }



}