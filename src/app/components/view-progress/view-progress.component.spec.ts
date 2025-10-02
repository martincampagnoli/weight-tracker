import { DataService } from 'src/app/services/data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';

import { ViewProgressComponent } from './view-progress.component';

describe('ViewProgressComponent', () => {
  let component: ViewProgressComponent;
  let fixture: ComponentFixture<ViewProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProgressComponent],
      providers: [UntypedFormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
