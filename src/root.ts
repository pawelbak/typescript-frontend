import { BackendApi } from "./com/scalepoint/sample/BackendApi";
import { View } from "./com/scalepoint/sample/view/View";
import { Controller } from "./com/scalepoint/sample/Controller";

export class MainTsClass {

    private controller: Controller

    constructor(
        baseUrl: string,
        resultDiv: HTMLElement,
        logger: HTMLElement
    ) {
        this.controller = new Controller(baseUrl, resultDiv, logger);
    }

    async showListOfTodos() {
        this.controller.startApp();
    }


}

