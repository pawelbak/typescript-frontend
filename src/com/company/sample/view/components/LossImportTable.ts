import Controller from "../../Controller";
import { LossImportData } from "../../models/LossImportResponse";
import { PseudoCategoryGroup } from "../../models/PseudoCategoryGroupsResponse";
import PseudoCategoryService from "../../PseudoCategoryService";

export default class LossImportTable {

    private parent: HTMLElement;
    private lossImportData: LossImportData[];
    private table: HTMLTableElement;
    private pseudoCategoryService: PseudoCategoryService;
    private controller: Controller;

    constructor(parent: HTMLElement, lossImportData: LossImportData[], pseudoCategoryService: PseudoCategoryService, controller: Controller) {
        this.parent = parent;
        this.lossImportData = lossImportData;
        this.pseudoCategoryService = pseudoCategoryService;
        this.controller = controller;
    }

    render() {
        this.table = document.createElement('table');
        this.parent.appendChild(this.table);
        this.renderTableHeader(["name", "group", "category", "newPrice"]);
        this.renderBody();
    }

    private renderTableHeader(headers: string[]) {
        var thead = this.table.createTHead();
        var headerRow = thead.insertRow();
        headers.forEach(function (header) {
            var headerCell = headerRow.insertCell();
            headerCell.innerText = header;
        })
    }

    private renderBody() {
        var me = this;
        const tbody = this.table.createTBody();
        this.lossImportData.forEach(function (lossLine) {
            me.renderRow(tbody, [
                me.createDescriptionCell(lossLine),
                me.createGroupNameCell(lossLine),
                me.prepareCategoryTableCell(lossLine),
                me.createNewPriceCell(lossLine)])
        })
    }

    private renderRow(tableBody: HTMLTableSectionElement, cells: any[]) {
        const trow = tableBody.insertRow();
        cells.forEach(function (cell) {
            var cellElement = trow.insertCell();
            cellElement.appendChild(cell);
        })
    }

    private createDescriptionCell(lossLine: LossImportData) {
        return document.createTextNode(lossLine.description);
    }

    private createGroupNameCell(lossLine: LossImportData) {
        return document.createTextNode(lossLine.groupName);
    }

    private createNewPriceCell(lossLine: LossImportData) {
        return document.createTextNode(lossLine.newPrice.toString());
    }

    private prepareCategoryTableCell(lossLine: LossImportData) {
        if (lossLine.categoryGroup !== null && lossLine.category !== null) {
            let categoryGroupName = this.pseudoCategoryService.findCategoryGroupName(lossLine.categoryGroup);
            let categoryName = this.pseudoCategoryService.findCategoryName(lossLine.category);

            return document.createTextNode(categoryGroupName + ' - ' + categoryName);
        } else {
            let select1 = this.prepareHTMLSelect(this.prepareListOfOptionsForCategoryGroup(this.pseudoCategoryService.getCategoryGroups()));
            select1.addEventListener("change", e => this.controller.onCategoryGroupChange(lossLine))
            let select2 = document.createElement('select');
            let wrapper = document.createElement('div');
            wrapper.appendChild(select1);
            wrapper.appendChild(select2);
            return wrapper;
        }
    }

    private prepareListOfOptionsForCategoryGroup(categoryGroups: PseudoCategoryGroup[]): HTMLOptionElement[] {
        let options: HTMLOptionElement[] = [];
        options.push(this.prepareHTMLOption('', ''));
        categoryGroups.forEach(cg => options.push(this.prepareHTMLOption(cg.id.toString(), cg.name)));
        return options;
    }


    private prepareHTMLOption(value: string, text: string): HTMLOptionElement {
        let optionElem = document.createElement('option');
        optionElem.value = value;
        optionElem.text = text;
        return optionElem;
    }

    private prepareHTMLSelect(options: HTMLOptionElement[]) {
        let select1 = document.createElement('select');
        options.forEach(o => select1.appendChild(o));
        return select1;
    }


}


