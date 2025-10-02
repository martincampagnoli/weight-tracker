import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';

import { EntryComponent } from './entry.component';
import { Entry } from 'src/app/models/Entry';

describe('EntryComponent', () => {
  let component: EntryComponent;
  let fixture: ComponentFixture<EntryComponent>;

  const mockEntry: Entry = {
    id: 1,
    weight: 70.5,
    date: '01-01-2024',
    description: 'Test entry'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EntryComponent,
        NoopAnimationsModule
      ],
      providers: [
        provideStore()
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryComponent);
    component = fixture.componentInstance;
    
    // Set required input
    fixture.componentRef.setInput('entry', mockEntry);
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should match snapshot', () => {
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('Input Properties', () => {
    it('should display entry data correctly', () => {
      const compiled = fixture.nativeElement;
      expect(compiled.textContent).toContain('70.5');
      expect(compiled.textContent).toContain('01-01-2024');
      expect(compiled.textContent).toContain('Test entry');
    });
  });
});
