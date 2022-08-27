export interface AlertForm {
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