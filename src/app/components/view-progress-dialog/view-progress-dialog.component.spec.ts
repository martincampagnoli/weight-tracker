import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

import { ViewProgressDialogComponent } from './view-progress-dialog.component';
import { DataService } from 'src/app/services/data.service';
import { of } from 'rxjs';

describe('ViewProgressDialogComponent', () => {
  let component: ViewProgressDialogComponent;
  let fixture: ComponentFixture<ViewProgressDialogComponent>;
  let mockDialogRef: jest.Mocked<MatDialogRef<ViewProgressDialogComponent>>;

  const initialState = {
    data: [],
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: jest.fn(),
      afterClosed: jest.fn(),
      beforeClosed: jest.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [ViewProgressDialogComponent, NoopAnimationsModule],
      providers: [
        {
          provide: DataService,
          useValue: {
            getData: jest.fn().mockReturnValue(of([])),
            sortEntriesByDate: jest.fn(),
          },
        },
        provideMockStore({ initialState }),
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewProgressDialogComponent);
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
    it('should render ViewProgressComponent', () => {
      fixture.detectChanges();

      const viewProgressComponent =
        fixture.debugElement.nativeElement.querySelector('app-view-progress');
      expect(viewProgressComponent).toBeTruthy();
    });

    it('should render dialog title', () => {
      fixture.detectChanges();

      const dialogTitle =
        fixture.debugElement.nativeElement.querySelector('[mat-dialog-title]');
      expect(dialogTitle).toBeTruthy();
    });

    it('should render dialog content', () => {
      fixture.detectChanges();

      const dialogContent =
        fixture.debugElement.nativeElement.querySelector('mat-dialog-content');
      expect(dialogContent).toBeTruthy();
    });
  });
});
