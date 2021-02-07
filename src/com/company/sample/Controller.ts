import { Todo } from "./models/Todo";
import { BackendApi } from "./BackendApi";
import { View } from "./view/View";


export class Controller {
    private backendApi: BackendApi
    private view: View

    private listOfTodos: Todo[]

    constructor(baseUrl: string,
        resultDiv: HTMLElement,
        logger: HTMLElement) {
        this.backendApi = new BackendApi(baseUrl);
        this.view = new View(resultDiv, logger, this);
    }

    async startApp() {
        this.listOfTodos = await this.backendApi.fetchData();
        this.view.render(this.listOfTodos);
    }

    onRowButtonClicked(row: any) {
        this.view.logMessage(`message:${row.title}`);
        console.log(row);
    }
}
