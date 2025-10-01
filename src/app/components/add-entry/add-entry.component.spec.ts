import { DataService } from 'src/app/services/data.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UntypedFormBuilder } from '@angular/forms';

import { AddEntryComponent } from './add-entry.component';

const mockDataService = {
  createUser: (value: any) => false,
};

describe('AddEntryComponent', () => {
  let component: AddEntryComponent;
  let fixture: ComponentFixture<AddEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEntryComponent],
      providers: [
        UntypedFormBuilder,
        { provide: DataService, useValue: mockDataService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
