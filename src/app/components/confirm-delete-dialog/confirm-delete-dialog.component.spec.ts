import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ConfirmDeleteDialogComponent } from './confirm-delete-dialog.component';

describe('ConfirmDeleteDialogComponent', () => {
  let component: ConfirmDeleteDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteDialogComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<ConfirmDeleteDialogComponent>>;

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
      afterClosed: jest.fn(),
      beforeClosed: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteDialogComponent, NoopAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteDialogComponent);
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

  describe('Template Rendering', () => {
    it('should render dialog title', () => {
      fixture.detectChanges();

      const dialogTitle =
        fixture.debugElement.nativeElement.querySelector('[mat-dialog-title]');
      expect(dialogTitle).toBeTruthy();
    });

    it('should render dialog actions', () => {
      fixture.detectChanges();

      const dialogActions =
        fixture.debugElement.nativeElement.querySelector('mat-dialog-actions');
      expect(dialogActions).toBeTruthy();
    });

    it('should render cancel and confirm buttons', () => {
      fixture.detectChanges();

      const buttons =
        fixture.debugElement.nativeElement.querySelectorAll('button');
      expect(buttons.length).toBe(2);
    });
  });

  describe('Dialog Interactions', () => {
    it('should have No button with mat-dialog-close', () => {
      fixture.detectChanges();

      const noButton = fixture.debugElement.nativeElement.querySelector(
        'button[mat-dialog-close]'
      );
      expect(noButton).toBeTruthy();
      expect(noButton.textContent.trim()).toBe('No');
    });

    it('should have Yes button with mat-dialog-close="true"', () => {
      fixture.detectChanges();

      const buttons =
        fixture.debugElement.nativeElement.querySelectorAll('button');
      const yesButton = Array.from(buttons).find(
        (btn: any) => btn.textContent?.trim() === 'Yes'
      ) as HTMLButtonElement;
      expect(yesButton).toBeTruthy();
      expect(yesButton.textContent?.trim()).toBe('Yes');
    });
  });
});
