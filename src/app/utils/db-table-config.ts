
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
                serverPaginationEnabled: true,
                exportEnabled: true,
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
                exportEnabled: true,
                edit: {
                    enabled: false,
                    column: ["apiStatus", "availableStatus"]
                },
                create: {
                    enabled: false,
                    column: ["apiStatus", "availableStatus"]
                }
            }, 
            {
                tableName: 'ncr_supplier_master',
                tableviewName: 'NCR SUPPLIER MASTER',
                tableApiName: 'supplier-master',
                serverPaginationEnabled: false,
                exportEnabled: true,
                edit: {
                    enabled: false,
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

}