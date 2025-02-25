import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritePaperDialogComponent } from './write-paper-dialog.component';

describe('WritePaperDialogComponent', () => {
  let component: WritePaperDialogComponent;
  let fixture: ComponentFixture<WritePaperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WritePaperDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WritePaperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
