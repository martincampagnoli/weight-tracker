import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { signal } from '@angular/core';

import { AddEntryComponent } from './add-entry.component';

describe('AddEntryComponent', () => {
  let component: AddEntryComponent;
  let fixture: ComponentFixture<AddEntryComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<AddEntryComponent>>;
  let mockSnackBar: jest.Mocked<MatSnackBar>;

  const initialState = {
    data: [],
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
      afterClosed: jest.fn(),
      beforeClosed: jest.fn(),
    } as any;

    mockSnackBar = {
      open: jest.fn(),
      dismiss: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [AddEntryComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        provideNativeDateAdapter(),
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: 'dialogRef', useValue: mockDialogRef },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntryComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('dialogRef', signal(mockDialogRef));
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('Form Validation', () => {
    it('should initialize form with default values', () => {
      expect(component.firstFormGroup).toBeDefined();
      expect(component.firstFormGroup.get('weight')?.value).toBe('');
    });
  });
});
