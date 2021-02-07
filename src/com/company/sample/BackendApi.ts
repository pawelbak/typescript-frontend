import { Todo } from "./models/Todo";

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



    async fetchData() {
        const data = await this.httpCall<Todo[]>(
            this.backendUrl + "/todos"
        );
        return data;
    }



}