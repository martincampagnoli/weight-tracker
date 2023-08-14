import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonLinkComponent } from './button-link.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ButtonLinkComponent', () => {
  let component: ButtonLinkComponent;
  let fixture: ComponentFixture<ButtonLinkComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonLinkComponent],
      imports: [MatIconModule, RouterModule, RouterTestingModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLinkComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.label = 'Test Label';
    component.route = '/test-route';
    component.icon = 'fa fa-icon';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display the label', () => {
    const labelElement = element.querySelector('span');
    expect(labelElement?.innerHTML).toContain('Test Label');
  });

  it('should have a route', () => {
    const linkElement = element.querySelector('a');
    expect(linkElement?.getAttribute('href')).toBe('/test-route');
  });
  it('should display the icon', () => {
    const iconElement = element.querySelector('mat-icon');
    expect(iconElement).toBeTruthy();
  });

  it('should have the correct routerLink attribute', () => {
    const linkElement = element.querySelector('a');
    expect(linkElement?.getAttribute('ng-reflect-router-link')).toBe(
      '/test-route'
    );
  });
});
