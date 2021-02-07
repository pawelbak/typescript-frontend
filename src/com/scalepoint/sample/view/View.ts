import { Todo } from "../models/Todo";
import { TableUtils } from "./utils/TableUtils";
import { Controller } from "../Controller";


export class View {
    private controller: Controller;

    private resultDiv: HTMLElement;
    private logger: HTMLElement;
    private tu: TableUtils;


    constructor(resultDiv: HTMLElement, logger: HTMLElement, controller: Controller) {
        this.resultDiv = resultDiv;
        this.logger = logger;
        this.tu = new TableUtils();
        this.controller = controller;
    }


    render(todos: Todo[]) {
        this.resultDiv.innerHTML = '';
        this.resultDiv.appendChild(this.renderTodosTable(todos));
    }

    logMessage(message: string) {
        this.logger.innerText = message;
    }

    private renderTodosTable(todos: Todo[]): HTMLElement {
        var me = this;
        var table = this.tu.createTable();
        this.tu.createHeader(table, ["id", "user", "text", "completed", "action"]);

        var tbody = table.createTBody();
        todos.forEach(function (todo) {
            me.tu.createRow(tbody, [
                me.tu.createTextElem('' + todo.id),
                me.tu.createTextElem('' + todo.userId),
                me.tu.createTextElem(todo.title),
                me.tu.createTextElem('' + todo.completed),
                me.tu.createButtonElem('click me', e => { me.controller.onRowButtonClicked(todo) })
            ])
        })

        return table;
    }

}