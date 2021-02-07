export interface PseudoCategoryGroupsResponse {
    pseudoCategoryGroups: PseudoCategoryGroup[];
}

export interface PseudoCategoryGroup {
    id: number;
    name: string;
    categories: PseudoCategory[];
}


export interface PseudoCategory {
    id: number;
    name: string;
}