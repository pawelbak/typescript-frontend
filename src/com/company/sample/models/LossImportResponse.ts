export interface LossImportResponse {
    lines: LossImportData[];
}

export interface LossImportData {
    id: number;
    description: string;
    groupName: string;
    categoryGroup: number;
    category: number;
    age: number;
    purchasePrice: number;
    newPrice: number;
    customerDemand: number;
    possibleValuations: ValuationData[];
}

export interface ValuationData {
    type: string;
    value: number;
    active: boolean;
}