import { Component, OnInit, ViewChild } from '@angular/core';
import { TableMetaData } from 'src/app/utils/table-meta-data';
import { DbTableConfig } from 'src/app/utils/db-table-config';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { ApiService } from '../service/api.service';

const ELEMENT_DATA_NCR_PPO: any[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' }
];

const ELEMENT_DATA_NCR_SUPPLIER_LOGIN_DETAILS: any[] = [
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' }
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
  canLoadGenericTable: Boolean;
  tableMetaData : TableMetaData[];
  selectedTableMetaData!: TableMetaData;
  selectedTableApiName : string;


  @ViewChild(GenericTableComponent, { static: true }) genericTableComponent!: GenericTableComponent;

  constructor(private api: ApiService, private dbTableConfig : DbTableConfig) {
    this.selectedTableApiName = "";
    this.canLoadGenericTable = false;
    this.tableMetaData = dbTableConfig.getTableMetaDataArray();
  }

  ngOnInit(): void {
  }

  showTableBtnClick() {
    this.canLoadGenericTable = true;
    // this.genericTableComponent.tableName = this.selectedTable;
    this.genericTableComponent.tableMetaData = this.selectedTableMetaData;    
    console.log(this.selectedTableMetaData.toString());        
    this.loadJsonListFromApi();
  }

  onChange(){    
    this.selectedTableMetaData = this.dbTableConfig.getTableMetaDataByApi(this.selectedTableApiName);
  }

  loadJsonListFromApi(): any[] {    
    let result: any[] = [];
    let isPaged: boolean = this.selectedTableMetaData.serverPaginationEnabled;
    this.api.getPage("/" + this.selectedTableMetaData.tableApiName, 0, 5, this.selectedTableMetaData.serverPaginationEnabled)
      .subscribe((res: any) => {
        result = res;
        this.genericTableComponent.paginatedData = res;   
        this.genericTableComponent.loadDataSource();
      })
    return result;
  }

}
