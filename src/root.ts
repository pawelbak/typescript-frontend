import { Controller } from "./com/company/sample/Controller";

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

