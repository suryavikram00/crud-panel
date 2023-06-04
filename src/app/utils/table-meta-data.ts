export interface TableMetaData {
    tableName: string;
    tableviewName: string;
    tableApiName: string;
    serverPaginationEnabled: boolean;
    searchColumn : String[],
    tableColumn : String[],
    exportEnabled: boolean,
    edit: ActionMetaData,
    create: ActionMetaData,
    accreditionEnabled:boolean
}

export interface ActionMetaData {
    enabled: boolean;
    column: String[];

}