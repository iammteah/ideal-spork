import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeechDialogComponent } from './speech-dialog.component';

describe('SpeechDialogComponent', () => {
  let component: SpeechDialogComponent;
  let fixture: ComponentFixture<SpeechDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpeechDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpeechDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
