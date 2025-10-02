import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';
import { GoalService } from 'src/app/services/goal.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as reducers from 'src/app/store/default';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;
  let element: HTMLElement;
  let store: MockStore;

  const mockGoalService = {
    calculateGoalProgress: jest.fn().mockReturnValue(75),
  };

  const initialState = {} as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent],
      providers: [
        { provide: GoalService, useValue: mockGoalService },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    store = TestBed.inject(MockStore);
    store.overrideSelector(reducers.getDataState, []);
    store.overrideSelector(reducers.getTargetWeight, 75);
    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should match snapshot', () => {
    expect(fixture).toMatchSnapshot();
  });
});
