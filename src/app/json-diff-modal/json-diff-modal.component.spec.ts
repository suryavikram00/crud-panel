import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonDiffModalComponent } from './json-diff-modal.component';

describe('JsonDiffModalComponent', () => {
  let component: JsonDiffModalComponent;
  let fixture: ComponentFixture<JsonDiffModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JsonDiffModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JsonDiffModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
