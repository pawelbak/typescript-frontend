import { TableUtils } from "./utils/TableUtils";
import { Controller } from "../Controller";
import { LossImportData } from "../models/LossImportResponse";
import { PseudoCategoryGroup } from "../models/PseudoCategory";


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


    render() {
        var me = this;
        this.resultDiv.innerHTML = '';
        this.resultDiv.appendChild(this.tu.createButtonElem("download loss data", e => me.controller.onLoadLossDataClicked()))
    }

    logMessage(message: string) {
        this.logger.innerText = message;
    }


    renderLossTable(lossImportLines: LossImportData[], categoriesTree: PseudoCategoryGroup[]) {
        let me = this;
        let table = this.tu.createTable();
        this.tu.createHeader(table, ["name", "group", "category", "newPrice"]);
        var tbody = table.createTBody();
        lossImportLines.forEach(function (lossLine) {
            me.tu.createRow(tbody, [
                me.tu.createTextElem(lossLine.description),
                me.tu.createTextElem(lossLine.groupName),
                me.prepareCategoryTableElement(lossLine, categoriesTree),
                me.tu.createTextElem('' + lossLine.newPrice)])
        })


        this.resultDiv.innerHTML = '';
        this.resultDiv.appendChild(table);
    }

    private prepareCategoryTableElement(lossLine: LossImportData, categoriesTree: PseudoCategoryGroup[]) {
        if (lossLine.categoryGroup !== null && lossLine.category !== null) {
            let categoryGroup = this.findCategoryGroupInTree(lossLine.categoryGroup, categoriesTree);
            let category = this.findCategoryInTree(lossLine.category, lossLine.categoryGroup, categoriesTree);


            return this.tu.createTextElem(categoryGroup.name + ' - ' + category.name);
        } else {
            let select1 = document.createElement('select');
            categoriesTree.forEach(cg => {
                let optionElem = document.createElement('option');
                optionElem.value = '' + cg.id;
                optionElem.text = cg.name;
                select1.appendChild(optionElem);
            });
            select1.addEventListener("change", e => this.controller.onCategoryGroupChange(lossLine))
            let select2 = document.createElement('select');
            let wrapper = document.createElement('div');
            wrapper.appendChild(select1);
            wrapper.appendChild(select2);
            return wrapper;
        }
    }

    private findCategoryGroupInTree(id: number, categoriesTree: PseudoCategoryGroup[]) {
        let categoryGroup = categoriesTree.find(cg => cg.id === id);
        if (categoryGroup === undefined) {
            throw new Error('Invalid category group - not found in categories tree');
        }
        return categoryGroup;
    }

    private findCategoryInTree(id: number, groupId: number, categoriesTree: PseudoCategoryGroup[]) {
        let categoryGroup = this.findCategoryGroupInTree(groupId, categoriesTree);
        let category = categoryGroup.categories.find(c => c.id = id);
        if (category === undefined) {
            throw new Error('Invalid category - not found in categories tree');
        }
        return category;
    }

}