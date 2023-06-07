
import { Injectable } from '@angular/core';
import { TableMetaData } from './table-meta-data';
import { EMPTY } from 'rxjs';

@Injectable({
    providedIn: 'root'
}) export class DbTableConfig {

    tableMetaDataArray: TableMetaData[];

    constructor() {
        this.tableMetaDataArray = [
            {
                tableName: 'ncr_supplier_login_details',
                tableviewName: 'NCR SUPPLIER LOGIN DETAILS',
                tableApiName: 'supplier-login-detail',
                serverPaginationEnabled: false,
                searchColumn : [],
                tableColumn : [],
                exportEnabled: true,
                accreditionEnabled : true,
                edit: {
                    enabled: true,
                    column: ["fcCode", "accessToken", "userId"]
                },
                create: {
                    enabled: true,
                    column: ["accessToken", "externalCustomerCode", "fcCode", "password", "supplierCode", "userId"]
                }

            },
            {
                tableName: 'ncr_zipcode',
                tableviewName: 'NCR ZIP CODE',
                tableApiName: 'zipcode',
                serverPaginationEnabled: true,
                searchColumn : [],
                tableColumn : [],
                exportEnabled: true,
                accreditionEnabled : false,
                edit: {
                    enabled: true,
                    column: ["apiStatus", "availableStatus"]
                },
                create: {
                    enabled: true,
                    column: ["apiStatus", "availableStatus"]
                }
            },
            {
                tableName: 'ncr_supplier_master',
                tableviewName: 'NCR SUPPLIER MASTER',
                tableApiName: 'supplier-master',
                serverPaginationEnabled: true,
                searchColumn : ["active", "autoSendEmail", "autoEmailOtcGeneratePo", "autoPo", "emailId", "name", "supplierCode"],
                tableColumn : [],
                exportEnabled: true,
                accreditionEnabled : false,
                edit: {
                    enabled: false,
                    column: []
                },
                create: {
                    enabled: false,
                    column: []
                }
            },
            {
                tableName: 'ncr_fc_master',
                tableviewName: 'NCR FC MASTER',
                tableApiName: 'fc-master',
                serverPaginationEnabled: false,
                searchColumn : [],
                tableColumn : [],
                exportEnabled: true,
                accreditionEnabled : false,
                edit: {
                    enabled: false,
                    column: []
                },
                create: {
                    enabled: false,
                    column: []
                }
            },
            {
                tableName: 'acc_request',
                tableviewName: 'ACCREDENTIAL REQUEST',
                tableApiName: 'acc-request',
                serverPaginationEnabled: false,
                searchColumn : ['action', 'id', 'status', 'submittedBy', 'submittedOn', 'tag', 'uniqueIdentifier'],
                tableColumn : ["action", "id", "status", "submittedBy", "submittedOn", "tag", "uniqueIdentifier"],
                exportEnabled: true,
                accreditionEnabled : false,
                edit: {
                    enabled: true,
                    column: ["status"]
                },
                create: {
                    enabled: false,
                    column: []
                }
            },
            {
                tableName: 'acc_request_detail',
                tableviewName: 'ACCREDENTIAL REQUEST_DETAIL',
                tableApiName: 'acc-request-detail',
                serverPaginationEnabled: false,
                searchColumn : ["accreditGroupLevel", "action", "approverEmail", "requestId", "status", "tag", "uniqueIdentifier"],
                tableColumn : ["id","accreditGroupLevel", "action", "approverEmail", "requestId", "status", "tag", "uniqueIdentifier", "requestStatus"],
                exportEnabled: true,
                accreditionEnabled : false,
                edit: {
                    enabled: true,
                    column: []
                },
                create: {
                    enabled: false,
                    column: []
                }
            }

        ];
    }

    public getTableMetaDataArray(): TableMetaData[] {
        console.log("getFilter in config table filter");
        return Object.assign([], this.tableMetaDataArray);
    }

    public getTableMetaDataByApi(apiName: string): TableMetaData {
        // this needs to be looked again #revisit
        let selectedTableMetaData: TableMetaData = this.tableMetaDataArray[0];
        for (let i = 0; i < this.tableMetaDataArray.length; i++) {
            if (this.tableMetaDataArray[i].tableApiName == apiName) {
                selectedTableMetaData = this.tableMetaDataArray[i];
            }
        }
        return Object.assign({}, selectedTableMetaData);
    }

    public getTableMetaDataByTableName(tableName: string): TableMetaData {
        // this needs to be looked again #revisit
        let selectedTableMetaData: TableMetaData = this.tableMetaDataArray[0];
        for (let i = 0; i < this.tableMetaDataArray.length; i++) {
            if (this.tableMetaDataArray[i].tableApiName == tableName) {
                selectedTableMetaData = this.tableMetaDataArray[i];
            }
        }
        return Object.assign({}, selectedTableMetaData);
    }

}