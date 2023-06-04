import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { diff_match_patch } from 'diff-match-patch';
import { ApiService } from '../service/api.service';
import { DbTableConfig } from '../utils/db-table-config';
import { TableMetaData } from '../utils/table-meta-data';



@Component({
  selector: 'app-json-diff-modal',
  templateUrl: './json-diff-modal.component.html',
  styleUrls: ['./json-diff-modal.component.css']
})
export class JsonDiffModalComponent implements OnInit {

  @Input() record: any;
  @Input() tableMetaData: TableMetaData;

  
  constructor(public activeModal: NgbActiveModal,
    private api: ApiService,
    private dbTableConfig: DbTableConfig) { }


  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close();
  }

  getHighlightedDiff(existingValue: any, newValue: any): string {
    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(
      JSON.stringify(JSON.parse(existingValue), null, 2),
      JSON.stringify(JSON.parse(newValue), null, 2)
    );
    dmp.diff_cleanupSemantic(diff);
    const highlightedDiff = diff.map(([op, text]) => {
      const style = op === 1 ? 'style=\"background-color: lightcoral;\"' : op === -1 ? 'style=\"background-color: lightgreen;\"' : '';
      return `<span ${style} >${text}</span>`;
    }).join('');
    return highlightedDiff;
  }

  diffModalBtnClick(status: string) {
    const clonedRecord = Object.assign({}, this.record)
    clonedRecord.status = status;
    // Perform the save operation
    this.api.httpPut("/" + this.tableMetaData.tableApiName, clonedRecord).subscribe((data: any) => {
      console.log(data);
      if (data.status !== 'FAILURE') {
        this.closeModal();
      }
    });

  }

}
