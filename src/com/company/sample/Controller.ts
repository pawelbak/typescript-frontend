import { BackendApi } from "./BackendApi";
import { View } from "./view/View";
import { LossImportData } from "./models/LossImportResponse";
import { PseudoCategoryGroup } from "./models/PseudoCategory";


export class Controller {
    private backendApi: BackendApi;
    private view: View;

    private lossImportLines: LossImportData[];
    private categoriesTree: PseudoCategoryGroup[];

    constructor(baseUrl: string,
        resultDiv: HTMLElement,
        logger: HTMLElement) {
        this.backendApi = new BackendApi(baseUrl);
        this.view = new View(resultDiv, logger, this);
    }

    async startApp() {
        this.view.render();
    }

    onCategoryGroupChange(lossLine: LossImportData) {
        this.view.logMessage(`category changed for line: ${lossLine.description}`);
    }

    async onLoadLossDataClicked() {
        let lossImportResponse = await this.backendApi.fetchLossImportData();
        this.lossImportLines = lossImportResponse.lines;
        console.log(JSON.stringify(this.lossImportLines));
        let categoriesTreeResponse = await this.backendApi.fetchPseudoCategoryData();
        this.categoriesTree = categoriesTreeResponse.pseudoCategoryGroups;
        console.log(JSON.stringify(this.categoriesTree));

        this.view.renderLossTable(this.lossImportLines, this.categoriesTree);
    }
}
