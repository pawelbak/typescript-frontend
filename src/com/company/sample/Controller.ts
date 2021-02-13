import { BackendApi } from "./BackendApi";
import { View } from "./view/View";
import { LossImportData } from "./models/LossImportResponse";
import PseudoCategoryService from "./PseudoCategoryService";


export default class Controller {
    private backendApi: BackendApi;
    private view: View;

    private lossImportLines: LossImportData[];
    private pseudoCategoryService: PseudoCategoryService;

    constructor(baseUrl: string, resultDiv: HTMLElement, logger: HTMLElement) {
        this.backendApi = new BackendApi(baseUrl);
        this.pseudoCategoryService = new PseudoCategoryService(this.backendApi);
        this.view = new View(this.pseudoCategoryService, resultDiv, logger, this);
    }

    async startApp() {
        this.view.render();
    }

    onCategoryGroupChange(lossLine: LossImportData) {
        this.view.logMessage(`category changed for line: ${lossLine.description}.`);
    }

    onLoadLossDataClicked(text: any) {
        console.log('button clicked with text: ' + text);
        this.loadLossData();
    }

    async loadLossData() {
        let lossImportResponse = await this.backendApi.fetchLossImportData();
        this.lossImportLines = lossImportResponse.lines;
        console.log(JSON.stringify(this.lossImportLines));


        this.view.renderLossTable(this.lossImportLines);
    }

}
