import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideNativeDateAdapter } from '@angular/material/core';
import { signal } from '@angular/core';
import { AddGoalComponent } from './add-goal.component';

describe('AddGoalComponent', () => {
  let component: AddGoalComponent;
  let fixture: ComponentFixture<AddGoalComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<AddGoalComponent>>;
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
      imports: [AddGoalComponent, NoopAnimationsModule],
      providers: [
        provideMockStore({ initialState }),
        provideNativeDateAdapter(),
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: 'dialogRef', useValue: mockDialogRef },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGoalComponent);
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
});
