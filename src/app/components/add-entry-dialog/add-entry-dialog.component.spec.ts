import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AddEntryDialogComponent } from './add-entry-dialog.component';

describe('AddEntryDialogComponent', () => {
  let component: AddEntryDialogComponent;
  let fixture: ComponentFixture<AddEntryDialogComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<AddEntryDialogComponent>>;

  const initialState = {
    data: []
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
      afterClosed: jest.fn(),
      beforeClosed: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [AddEntryDialogComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        provideNativeDateAdapter(),
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddEntryDialogComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
      fixture.detectChanges();
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('Properties', () => {
    it('should inject MatDialogRef', () => {
      expect(component.dialogRef).toBeDefined();
      expect(component.dialogRef).toBe(mockDialogRef);
    });
  });

  describe('Template Rendering', () => {
    it('should render AddEntryComponent', () => {
      fixture.detectChanges();

      const addEntryComponent =
        fixture.debugElement.nativeElement.querySelector('app-add-entry');
      expect(addEntryComponent).toBeTruthy();
    });
  });
});
