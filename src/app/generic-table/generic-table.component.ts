import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ApiService } from '../service/api.service';

import 'datatables.net';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from '../service/toastr.service';
import { PaginatedData } from '../utils/PaginatedData';
import { TableMetaData } from '../utils/table-meta-data';
import { DbTableConfig } from '../utils/db-table-config';


@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent {

  paginatedData!: PaginatedData<any>;
  tableMetaData!: TableMetaData;

  searchObject: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns!: string[];
  // orginalContentArray : any[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    console.log(' in view ' + this.paginatedData);
  }

  public loadDataSource() {
    this.loadTableHeader();
    this.loadTableData();
    this.loadTablePaginator();
  }

  private loadTableHeader() {
    console.log(this.paginatedData);
    console.log(this.paginatedData.content);
    if (this.paginatedData.content.length == 0) {
      return;
    }
    this.displayedColumns = Object.keys(this.paginatedData.content[0]);
    // if (this.searchObject == undefined) {
      this.searchObject = Object.assign({}, this.paginatedData.content[0]);
      // initialize the search object values to empty
      for (let index = 0; index < this.displayedColumns.length; index++) {
        this.searchObject[this.displayedColumns[index]] = "";
      }
    // }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  searchBtnClick() {
    console.log(this.searchObject);

    let attributeNameArray = Object.keys(this.searchObject);

    let isSearchValueEntered: boolean = false;
    for (let index = 0; index < attributeNameArray.length; index++) {

      if (this.searchObject[attributeNameArray[index]] != '') {
        isSearchValueEntered = true;
      }
    }
    // if value are being inputed then call search results
    if (isSearchValueEntered) {
      // update paginated data to false
      this.tableMetaData.serverPaginationEnabled = false;

      this.api.getSearchResult("/" + this.tableMetaData.tableApiName, this.searchObject).subscribe((data: any) => {
        this.paginatedData = data.pageData;
        this.loadDataSource();
      });
    } else {
      // reload the paginated from the configuration
      this.tableMetaData = this.dbTableConfig.getTableMetaDataByApi(this.tableMetaData.tableApiName);
      // if no value is being inputed then call the submit event function
      this.getData(0, 5);
      if (this.dataSource != null && this.dataSource.paginator != null) {
        this.dataSource.paginator.pageIndex = 0;
      }

    }
  }

  private loadTablePaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageIndex = 0;
  }

  private loadTableData() {   
    let clonedContentArray : any[] = [];
    this.paginatedData.content.forEach(item => {
      item.editMode = false;
      clonedContentArray.push(Object.assign({}, item));
    });
    // clone the list
    // let clonedPaginatedData = Object.assign([], this.paginatedData.content);
    this.dataSource = new MatTableDataSource<any>(clonedContentArray);
  }

  url: string = "/";

  constructor(private api: ApiService, private dbTableConfig: DbTableConfig) {

  }

  private getData(pageNumber: number, pageSize: number) {
    this.api.getPage("/" + this.tableMetaData.tableApiName, pageNumber, pageSize, this.tableMetaData.serverPaginationEnabled).subscribe((data: any) => {
      this.paginatedData = data.pageData;
      if (this.tableMetaData.serverPaginationEnabled) {
        this.loadTableData();
      } else {
        this.loadDataSource();
      }

    });
  }

  onPageChange(event: PageEvent) {
    // Do something with the page event, such as updating your data source
    // based on the new page index and page size
    console.log(event);
    if (this.tableMetaData.serverPaginationEnabled) {
      this.getData(event.pageIndex, event.pageSize);
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  toggleEdit(record: any): void {
    record.editMode = !record.editMode;
  }
  
  saveChanges(record: any): void {
    console.log(record);
    record.editMode = false;
    // Perform the save operation
    this.api.httpPut("/" + this.tableMetaData.tableApiName, record).subscribe((data: any) => {
      console.log(data);
    });;
  }
  
  cancelEdit(record: any): void {    
    const originalRecord = this.paginatedData.content.find(item => item.id === record.id);        
    record.editMode = false;    
    Object.assign(record, originalRecord);        
  }

}
