import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-json-diff-modal',
  templateUrl: './json-diff-modal.component.html',
  styleUrls: ['./json-diff-modal.component.css']
})
export class JsonDiffModalComponent implements OnInit {

  @Input() existingValue: any;
  @Input() newValue: any;

  constructor(public activeModal: NgbActiveModal) {}


  ngOnInit(): void {
  }

  closeModal() {
    this.activeModal.close();
  }

}
