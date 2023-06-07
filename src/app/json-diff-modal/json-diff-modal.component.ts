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
  currentDiffIndex: number = 0;
  numberOfHighlightedDiff: number = 0;
  previousHighlightedElement: HTMLElement | null = null;
  readonly highOpacity = '1';
  readonly lowOpacity = '0.7';

  constructor(public activeModal: NgbActiveModal,
    private api: ApiService,
    private dbTableConfig: DbTableConfig) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.currentDiffIndex = this.numberOfHighlightedDiff;
    this.moveToNextDifference();
  }

  closeModal() {
    this.activeModal.close();
  }

  getHighlightedDiff(existingValue: any, newValue: any, showOnlyExistingValue: boolean): string {
    const dmp = new diff_match_patch();
    const diff = dmp.diff_main(
      JSON.stringify(JSON.parse(existingValue), null, 2),
      JSON.stringify(JSON.parse(newValue), null, 2)
    );
    dmp.diff_cleanupSemantic(diff);
    let index = 0;
    this.numberOfHighlightedDiff = 0;
    const highlightedDiff = diff.map(([op, text]) => {
      if (showOnlyExistingValue) {
        const style = op === 1 ? 'style=\"color: white;\"' : op === -1 ? 'style=\"\"' : '';
        return `<span ${style} >${text}</span>`;

      } else {
        let style = op === 1 ? 'style=\"background-color: lightgreen; opacity : '+this.lowOpacity+';\"'
          : op === -1 ? 'style=\"background-color: lightcoral; opacity : '+this.lowOpacity+';\"' : '';
        const id = op === 1 || op === -1 ? " id = diff-" + index++ : '';
        op === 1 || op === -1 ? this.numberOfHighlightedDiff++ : '';
        return `<span ${id}  ${style} >${text}</span>`;
      }

    }).join('');
    return highlightedDiff;
  }

  moveToNextDifference() {
    this.currentDiffIndex++;
    if (this.currentDiffIndex >= this.numberOfHighlightedDiff) {
      this.currentDiffIndex = 0; // Start from the beginning if reached the end
    }

    // Scroll to the next difference element using JavaScript's scrollIntoView method

    const element = document.getElementById(`diff-${this.currentDiffIndex}`);
    if (element) {
      if (this.previousHighlightedElement) {
        // Restore the background color of the previous highlighted element
        const previousBackgroundColor = this.previousHighlightedElement.getAttribute('data-background-color');
        if (previousBackgroundColor) {
          this.previousHighlightedElement.style.backgroundColor = previousBackgroundColor;
        }
        const previousOpacity = this.previousHighlightedElement.getAttribute('data-opacity');
        if (previousOpacity) {
          this.previousHighlightedElement.style.opacity = previousOpacity;
        }
      }

      // Override the background color of the current element with yellow
      const previousBackgroundColor = element.style.backgroundColor;
      const previousOpacity = element.style.opacity;
      element.setAttribute('data-background-color', previousBackgroundColor);
      element.setAttribute('data-opacity', previousOpacity);
      // element.style.backgroundColor = 'yellow';
      element.style.opacity = this.highOpacity;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      this.previousHighlightedElement = element; // Store the current element as the previously highlighted element
    }
  }

  moveToPreviousDifference() {
    this.currentDiffIndex--;
    if (this.currentDiffIndex < 0) {
      this.currentDiffIndex = this.numberOfHighlightedDiff - 1; // Start from the end if reached the beginning
    }

    // Scroll to the previous difference element using JavaScript's scrollIntoView method
    const element = document.getElementById(`diff-${this.currentDiffIndex}`);
    if (element) {
      if (this.previousHighlightedElement) {
        // Restore the background color of the previous highlighted element
        const previousBackgroundColor = this.previousHighlightedElement.getAttribute('data-background-color');
        if (previousBackgroundColor) {
          this.previousHighlightedElement.style.backgroundColor = previousBackgroundColor;
        }
        const previousOpacity = this.previousHighlightedElement.getAttribute('data-opacity');
        if (previousOpacity) {
          this.previousHighlightedElement.style.opacity = previousOpacity;
        }
      }

      // Override the background color of the current element with yellow
      const previousBackgroundColor = element.style.backgroundColor;
      const previousOpacity = element.style.opacity;
      element.setAttribute('data-background-color', previousBackgroundColor);
      element.setAttribute('data-opacity', previousOpacity);
      // element.style.backgroundColor = 'yellow';
      element.style.opacity = this.highOpacity;
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });

      this.previousHighlightedElement = element; // Store the current element as the previously highlighted element
    }
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
