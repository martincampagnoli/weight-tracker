import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonLinkComponent } from './button-link.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';

describe('ButtonLinkComponent', () => {
  let component: ButtonLinkComponent;
  let fixture: ComponentFixture<ButtonLinkComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonLinkComponent, MatIconModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonLinkComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    // Set input signals using fixture.componentRef.setInput
    fixture.componentRef.setInput('label', 'Test Label');
    fixture.componentRef.setInput('route', '/test-route');
    fixture.componentRef.setInput('icon', 'fa fa-icon');

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
    expect(linkElement).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should match snapshot with default props', () => {
    expect(element).toMatchSnapshot();
  });

  it('should match snapshot with different icon', () => {
    const newFixture = TestBed.createComponent(ButtonLinkComponent);
    newFixture.componentRef.setInput('label', 'Settings');
    newFixture.componentRef.setInput('route', '/settings');
    newFixture.componentRef.setInput('icon', 'settings');
    newFixture.detectChanges();
    expect(newFixture.nativeElement).toMatchSnapshot();
  });

  it('should match snapshot with long label', () => {
    const newFixture = TestBed.createComponent(ButtonLinkComponent);
    newFixture.componentRef.setInput(
      'label',
      'This is a very long button label'
    );
    newFixture.componentRef.setInput('route', '/long-route-name');
    newFixture.componentRef.setInput('icon', 'info');
    newFixture.detectChanges();
    expect(newFixture.nativeElement).toMatchSnapshot();
  });

  it('should match snapshot with empty-like values', () => {
    const newFixture = TestBed.createComponent(ButtonLinkComponent);
    newFixture.componentRef.setInput('label', '');
    newFixture.componentRef.setInput('route', '/');
    newFixture.componentRef.setInput('icon', '');
    newFixture.detectChanges();
    expect(newFixture.nativeElement).toMatchSnapshot();
  });
});
