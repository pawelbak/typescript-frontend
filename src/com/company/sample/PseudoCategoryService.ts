import { BackendApi } from "./BackendApi";
import { PseudoCategory, PseudoCategoryGroup } from "./models/PseudoCategoryGroupsResponse";

export default class PseudoCategoryService {

    private pseudoCategoryTree: PseudoCategoryGroup[];


    constructor(backendApi: BackendApi) {
        this.fetchDataFromApi(backendApi);
    }

    private async fetchDataFromApi(backendApi: BackendApi) {
        const data = await backendApi.fetchPseudoCategoryData();
        this.pseudoCategoryTree = data.pseudoCategoryGroups;
    }

    findCategoryGroupName(groupId: number): string {
        return this.findCategoryGroup(groupId).name;
    }

    findCategoryGroup(groupId: number): PseudoCategoryGroup {
        let categoryGroup = this.pseudoCategoryTree.find(cg => cg.id === groupId);
        if (categoryGroup === undefined) {
            throw new Error('Invalid category group - not found in categories tree');
        }
        return categoryGroup;
    }

    findCategoryName(categoryId: number): string {
        return this.findCategory(categoryId).name;
    }

    findCategory(categoryId: number): PseudoCategory {
        let category: PseudoCategory;
        this.pseudoCategoryTree.forEach(g => g.categories.forEach(c => {
            if (c.id === categoryId) {
                category = c;
                return;
            }
        }
        ));
        if (category !== undefined) {
            return category;
        }
        throw new Error(`Invalid category - not found in categories tree: ${categoryId}`);
    }

    getCategoryGroups(): PseudoCategoryGroup[] {
        return this.pseudoCategoryTree;
    }

}