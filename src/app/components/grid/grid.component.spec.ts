/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GridComponent } from './grid.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { AppEffects } from 'src/app/store/effects';
import { GetData } from 'src/app/store/actions';
import { ChipListComponent } from '../chip-list/chip-list.component';

const mockStore = { select: () => of(null), dispatch: (_action: any) => null };
const mockAppEffects = { $getData: of(null) };

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent, ChipListComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore,
        },
        {
          provide: AppEffects,
          useValue: mockAppEffects,
        },
      ],
      imports: [
        MatProgressBarModule,
        BrowserAnimationsModule,
        MatSnackBarModule,
        MatGridListModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to get data on init', () => {
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const action = new GetData();
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
