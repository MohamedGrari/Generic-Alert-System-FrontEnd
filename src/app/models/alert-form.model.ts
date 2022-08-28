export interface AlertForm {
    id?: number,
    entity: string;
    entityCriteria: string;
    entityCriteriaValue: string;
    attribute: string;
    wantedAttributeValue: string;
    alertMode: string;
    destination: string;
    destinationValue: string;
    text: string;
    dayNumber: number;
    update: boolean;
}