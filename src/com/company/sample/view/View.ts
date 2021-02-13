import Controller from "../Controller";
import { LossImportData } from "../models/LossImportResponse";
import MyButton from "./components/MyButton";
import PseudoCategoryService from "../PseudoCategoryService";
import LossImportTable from "./components/LossImportTable";


export class View {
    private controller: Controller;

    private resultDiv: HTMLElement;
    private logger: HTMLElement;
    private pseudoCategoryService: PseudoCategoryService;


    constructor(pseudoCategoryService: PseudoCategoryService, resultDiv: HTMLElement, logger: HTMLElement, controller: Controller) {
        this.pseudoCategoryService = pseudoCategoryService;
        this.resultDiv = resultDiv;
        this.logger = logger;
        this.controller = controller;
    }


    render() {
        this.resultDiv.innerHTML = '';
        new MyButton(this.resultDiv, 'Download loss data (button 1)', e => this.controller.onLoadLossDataClicked(e)).render();
        new MyButton(this.resultDiv, 'Download loss data (button 2)', e => this.controller.onLoadLossDataClicked(e)).render();
    }

    logMessage(message: string) {
        this.logger.innerText = message;
    }


    renderLossTable(lossImportLines: LossImportData[]) {
        new LossImportTable(this.resultDiv, lossImportLines, this.pseudoCategoryService, this.controller).render();
    }

}