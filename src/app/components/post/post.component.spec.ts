/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UpdateDisplayValue } from 'src/app/store/actions';

const mockStore = { select: () => of(null), dispatch: (_action: any) => null };

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [
        {
          provide: Store,
          useValue: mockStore,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to update display key', () => {
    component.post = {
      title: 'test',
      userId: 23,
      id: 1,
      body: 'test body',
      displayKey: 'TITLE',
    };
    const dispatchSpy = spyOn(mockStore, 'dispatch');
    const action = new UpdateDisplayValue({
      post: component.post,
      displayKey: component.keys[1],
    });
    component.changeDisplayValue();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });

  it('should update display key from TITLE to USERID', () => {
    component.post = {
      title: 'test',
      userId: 23,
      id: 1,
      body: 'test body',
      displayKey: 'TITLE',
    };
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    const action = new UpdateDisplayValue({
      post: component.post,
      displayKey: component.keys[1],
    });
    component.changeDisplayValue();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  it('should update display key from TITLE to USERID', () => {
    component.post = {
      title: 'test',
      userId: 23,
      id: 1,
      body: 'test body',
      displayKey: 'TITLE',
    };
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    const action = new UpdateDisplayValue({
      post: component.post,
      displayKey: component.keys[1],
    });
    component.changeDisplayValue();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  it('should update display key from USERID to ID', () => {
    component.post = {
      title: 'test',
      userId: 23,
      id: 1,
      body: 'test body',
      displayKey: 'USERID',
    };
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    const action = new UpdateDisplayValue({
      post: component.post,
      displayKey: component.keys[2],
    });
    component.changeDisplayValue();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  it('should update display key from ID to BODY', () => {
    component.post = {
      title: 'test',
      userId: 23,
      id: 1,
      body: 'test body',
      displayKey: 'ID',
    };
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    const action = new UpdateDisplayValue({
      post: component.post,
      displayKey: component.keys[3],
    });
    component.changeDisplayValue();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
  it('should update display key from BODY to TITLE', () => {
    component.post = {
      title: 'test',
      userId: 23,
      id: 1,
      body: 'test body',
      displayKey: 'BODY',
    };
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    const action = new UpdateDisplayValue({
      post: component.post,
      displayKey: component.keys[0],
    });
    component.changeDisplayValue();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(dispatchSpy).toHaveBeenCalledWith(action);
  });
});
