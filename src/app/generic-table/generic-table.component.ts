import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { ApiService } from '../service/api.service';
import { saveAs } from 'file-saver';

import 'datatables.net';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PaginatedData } from '../utils/PaginatedData';
import { TableMetaData } from '../utils/table-meta-data';
import { DbTableConfig } from '../utils/db-table-config';
import { JsonDiffModalComponent } from '../json-diff-modal/json-diff-modal.component';




@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.css']
})
export class GenericTableComponent {

  @ViewChild('closebutton') closebutton: any;

  modalRef: NgbModalRef | undefined; // Modal reference


  paginatedData!: PaginatedData<any>;
  tableMetaData!: TableMetaData;

  searchObject: any;
  createObject: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  contentColumn: string[] = [];
  currentPageNo: number = 0;
  currentPageSize: number = 5;
  loadContentUsingFilter: boolean = false;
  // orginalContentArray : any[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  constructor(private modalService: NgbModal,
    private api: ApiService,
    private dbTableConfig: DbTableConfig) {

  }

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
    this.displayedColumns = [];
    this.displayedColumns = this.tableMetaData.tableColumn.length > 0 ? Object.keys(this.paginatedData.content[0])
      .filter(key => this.tableMetaData.tableColumn.includes(key))
      : Object.keys(this.paginatedData.content[0]);

    console.log('columns :: ' + this.displayedColumns);
    if (!this.loadContentUsingFilter) {
      this.searchObject = Object.assign({}, this.paginatedData.content[0]);
      this.createObject = Object.assign({}, this.paginatedData.content[0]);
      // initialize the search object values to empty
      console.log('length => ' + Object.keys(this.paginatedData.content[0]).length);
      this.contentColumn = Object.keys(this.paginatedData.content[0]);
      for (let index = 0; index < this.contentColumn.length; index++) {
        this.searchObject[this.contentColumn[index]] = "";
        this.createObject[this.contentColumn[index]] = "";
      }
    }
  }

  trackByFn(index: any, item: any) {
    return index;
  }

  export() {
    let result: any[] = [];
    this.api.export("/" + this.tableMetaData.tableApiName, this.paginatedData.content)
      .subscribe((res: any) => {
        this.saveFile(res, this.tableMetaData.tableApiName + '.csv');
      })
    return result;
  }

  saveFile(data: any, filename: string): void {
    const blob = new Blob([data], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  searchBtnClick() {
    console.log(this.searchObject);
    this.restoreDefaultPageCount();
    let attributeNameArray = Object.keys(this.searchObject);

    let isSearchValueEntered: boolean = false;
    for (let index = 0; index < attributeNameArray.length; index++) {

      if (this.searchObject[attributeNameArray[index]] != '') {
        isSearchValueEntered = true;
      }
    }
    // if value are being inputed then call search results
    if (isSearchValueEntered) {
      this.loadContentUsingFilter = true;
      // update paginated data to false
      // this.tableMetaData.serverPaginationEnabled = false;

      this.api.getSearchResult("/" + this.tableMetaData.tableApiName,
        this.searchObject,
        this.tableMetaData.serverPaginationEnabled,
        this.currentPageNo, this.currentPageSize).subscribe((data: any) => {
          this.paginatedData = data.pageData;
          this.loadDataSource();
        });
    } else {
      this.loadContentUsingFilter = false;
      // reload the paginated from the configuration
      this.tableMetaData = this.dbTableConfig.getTableMetaDataByApi(this.tableMetaData.tableApiName);
      // if no value is being inputed then call the submit event function      
      this.getData(this.currentPageNo, this.currentPageSize);
      if (this.dataSource != null && this.dataSource.paginator != null) {
        this.dataSource.paginator.pageIndex = 0;
      }
    }
  }

  private restoreDefaultPageCount() {
    this.currentPageNo = 0;
    this.currentPageSize = 5;
  }

  private loadTablePaginator() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageIndex = this.currentPageNo != 0 ? this.currentPageNo : 0;
  }

  private loadTableData() {
    let clonedContentArray: any[] = [];
    this.paginatedData.content.forEach(item => {
      item.editMode = false;
      clonedContentArray.push(Object.assign({}, item));
    });
    this.dataSource = new MatTableDataSource<any>(clonedContentArray);
  }

  url: string = "/";

  private getData(pageNumber: number, pageSize: number) {
    this.currentPageNo = pageNumber;
    this.currentPageSize = pageSize;
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
    if (this.tableMetaData.serverPaginationEnabled && !this.loadContentUsingFilter) {
      this.getData(event.pageIndex, event.pageSize);
    } else if (this.tableMetaData.serverPaginationEnabled && this.loadContentUsingFilter) {
      this.currentPageNo = event.pageIndex;
      this.currentPageSize = event.pageSize;
      this.api.getSearchResult("/" + this.tableMetaData.tableApiName,
        this.searchObject,
        this.tableMetaData.serverPaginationEnabled,
        event.pageIndex, event.pageSize).subscribe((data: any) => {
          this.paginatedData = data.pageData;
          this.loadTableData();
        });
    } else {
      this.currentPageNo = event.pageIndex;
      this.currentPageSize = event.pageSize;
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
    if (this.tableMetaData.accreditionEnabled) {
      this.submitForAccredtion(record, (data: any) => {
        if (data.status === 'FAILURE') {
          record.editMode = true;
        } else {
          record.editMode = false;
          this.loadDataSource();
        }
      });
    } else {
      this.updateRecord(record);
    }

  }

  private submitForAccredtion(record: any, callback: (data: any) => void) {

    let tableMetaData: TableMetaData = this.dbTableConfig.getTableMetaDataByApi('acc-request');
    const originalRecord = this.paginatedData.content.find(item => item.id === record.id);
    delete record.editMode;
    delete originalRecord.editMode;
    let accRequest = {
      "tag": this.tableMetaData.tableName,
      "uniqueIdentifier": record.id,
      "newValue": JSON.stringify(record),
      "existingValue": JSON.stringify(originalRecord),
      "requestStatus": record.requestStatus
    };
    this.api.httpPost("/" + tableMetaData.tableApiName, accRequest).subscribe((data: any) => {
      console.log(data);
      // Call the callback function
      if (typeof callback === 'function') {
        callback(data);
      }
    });
  }

  private updateRecord(record: any) {
    // Perform the save operation
    this.api.httpPut("/" + this.tableMetaData.tableApiName, record).subscribe((data: any) => {
      console.log(data);
      if (data.status === 'FAILURE') {
        record.editMode = true;
      } else {
        record.editMode = false;
      }
    });

  }

  createBtnClick(): void {
    console.log(this.createObject);

    let attributeNameArray = Object.keys(this.createObject);

    let isAllFieldEntered: boolean = true;
    for (let index = 0; index < attributeNameArray.length; index++) {
      if (this.createObject[attributeNameArray[index]] === '') {
        isAllFieldEntered = false;
      }
    }
    // update paginated data to false
    this.tableMetaData.serverPaginationEnabled = false;

    // Perform the save operation
    this.api.httpPost("/" + this.tableMetaData.tableApiName, this.createObject).subscribe((data: any) => {
      console.log(data);
      if (data.status === 'FAILURE') {
        return;
      }
      // reload the paginated from the configuration
      this.tableMetaData = this.dbTableConfig.getTableMetaDataByApi(this.tableMetaData.tableApiName);
      // if no value is being inputed then call the submit event function
      this.getData(this.currentPageNo, this.currentPageSize);
      if (this.dataSource != null && this.dataSource.paginator != null) {
        this.dataSource.paginator.pageIndex = 0;
      }
      this.closeModal();
    });
  }

  cancelEdit(record: any): void {
    const originalRecord = this.paginatedData.content.find(item => item.id === record.id);
    record.editMode = false;
    Object.assign(record, originalRecord);
  }

  // Close the modal
  closeModal() {
    this.closebutton.nativeElement.click();
  }

  openCreateModalBtnClick(): void {
    this.createObject = Object.assign({}, this.paginatedData.content[0]);
    // initialize the search object values to empty
    for (let index = 0; index < this.contentColumn.length; index++) {
      this.createObject[this.contentColumn[index]] = "";
    }
  }

  public isEditable(key: any): boolean {
    return key !== 'editMode' && this.tableMetaData.create.column.includes(key);
  }

  public canShowSearchField(key: any): boolean {
    return this.tableMetaData.searchColumn.includes(key);
  }

  public canShowTableField(key: any): boolean {
    return this.tableMetaData.tableColumn.includes(key);
  }

  diffBtnClick(row: any) {
    const modalOptions = {
      centered: true,
      backdrop: true,
      keyboard: false,
      size: 'lg'
    };
    this.modalRef = this.modalService.open(JsonDiffModalComponent, modalOptions);
    this.modalRef.componentInstance.record = row;
    this.modalRef.componentInstance.tableMetaData = this.tableMetaData;
  }

}
