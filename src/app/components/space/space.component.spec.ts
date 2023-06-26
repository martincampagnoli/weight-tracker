import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormRenderComponent } from './form-render.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
const mockData = [
  {
    field: 'name',
    label: 'Name',
    type: 'text',
    hidden: 'false',
    mandatory: true,
  },
  {
    field: 'email',
    label: 'Email',
    type: 'text',
    hidden: 'false',
    mandatory: true,
  },
  {
    field: 'confirm',
    label: 'Checkbox with confirmation',
    type: 'check',
    hidden: 'false',
  },
  {
    field: 'hiddenField',
    label: '',
    type: 'text',
    hidden: 'true',
    mandatory: false,
  },
];

describe('FormRenderComponent', () => {
  let component: FormRenderComponent;
  let fixture: ComponentFixture<FormRenderComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormRenderComponent],
      providers: [
        {
          provide: Store,
          useValue: { select: () => of(mockData), dispatch: () => null },
        },
        { provide: FormBuilder, useValue: formBuilder },
      ],
      imports: [
        ReactiveFormsModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatCheckboxModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRenderComponent);
    component = fixture.componentInstance;
    component.formData = mockData;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should submit the form and display the data in console log', () => {
    const logSpy = spyOn(console, 'log');
    component.renderForm.value;
    component.onSubmit();
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy).toHaveBeenCalledWith(component.renderForm.value);
  });
});
