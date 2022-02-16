import { NumericLiteral } from 'typescript';

export class AssumptionTableRows {
    id: number;
    lookupTableId: number;
    name: string;
    value: number;
    sortOrder: number;
    modifyById: number;
    modifyDate: Date;
    isActive: boolean;
}