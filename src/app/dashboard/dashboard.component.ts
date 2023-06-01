import { Component, OnInit, ViewChild } from '@angular/core';
import { TableMetaData } from 'src/app/utils/table-meta-data';
import { DbTableConfig } from 'src/app/utils/db-table-config';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { ApiService } from '../service/api.service';

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
        result = res.pageData;
        this.genericTableComponent.paginatedData = res.pageData;   
        this.genericTableComponent.loadContentUsingFilter = false;
        this.genericTableComponent.loadDataSource();
      })
    return result;
  }

}
