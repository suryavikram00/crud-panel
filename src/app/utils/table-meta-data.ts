export interface TableMetaData {
    tableName: string;
    tableviewName: string;
    tableApiName: string;
    serverPaginationEnabled: boolean;
    exportEnabled: boolean,
    edit: ActionMetaData,
    create: ActionMetaData
}

export interface ActionMetaData {
    enabled: boolean;
    column: String[];

}