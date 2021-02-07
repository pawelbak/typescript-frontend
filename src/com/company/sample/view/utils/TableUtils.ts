
export class TableUtils {

    createTable(): HTMLTableElement {
        return document.createElement('table');
    }

    createHeader(table: HTMLTableElement, headers: string[]) {
        var thead = table.createTHead();
        var headerRow = thead.insertRow();
        headers.forEach(function (header) {
            var headerCell = headerRow.insertCell();
            headerCell.innerText = header;
        })
    }

    createRow(tableBody: HTMLTableSectionElement, cells: any[]) {
        var trow = tableBody.insertRow();
        cells.forEach(function (cell) {
            var cellElement = trow.insertCell();
            cellElement.appendChild(cell);
        })
    }

    createTextElem(text: string) {
        return document.createTextNode(text);
    }

    createButtonElem(text: string, listener: (e: Event) => any) {
        var button = document.createElement("button");
        button.innerText = text;
        button.addEventListener("click", listener);
        return button;
    }


}
