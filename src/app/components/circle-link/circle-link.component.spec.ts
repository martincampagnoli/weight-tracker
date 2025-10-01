import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CircleLinkComponent } from './circle-link.component';

describe('CircleLinkComponent', () => {
  let component: CircleLinkComponent;
  let fixture: ComponentFixture<CircleLinkComponent>;
  let element: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircleLinkComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleLinkComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;

    fixture.componentRef.setInput('title', 'Test Title');
    fixture.componentRef.setInput('link', 'https://example.com');
    fixture.componentRef.setInput('img', 'test-image.jpg');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the correct title', () => {
    const linkElement = element.querySelector('a');
    expect(linkElement?.getAttribute('title')).toBe('Test Title');
  });

  it('should have the correct link', () => {
    const linkElement = element.querySelector('a');
    expect(linkElement?.getAttribute('href')).toBe('https://example.com');
  });

  it('should have the correct image source', () => {
    const imgElement = element.querySelector('img');
    expect(imgElement?.getAttribute('src')).toBe('test-image.jpg');
  });

  it('should have target="_blank" and rel="noopener"', () => {
    const linkElement = element.querySelector('a');
    expect(linkElement?.getAttribute('target')).toBe('_blank');
    expect(linkElement?.getAttribute('rel')).toBe('noopener');
  });

  it('should match snapshot with default props', () => {
    expect(element).toMatchSnapshot();
  });

  it('should match snapshot with different props', () => {
    const newFixture = TestBed.createComponent(CircleLinkComponent);
    newFixture.componentRef.setInput('title', 'Documentation');
    newFixture.componentRef.setInput('link', 'https://angular.io');
    newFixture.componentRef.setInput('img', 'angular-logo.png');
    newFixture.detectChanges();
    expect(newFixture.nativeElement).toMatchSnapshot();
  });

  it('should match snapshot with special characters in title', () => {
    const newFixture = TestBed.createComponent(CircleLinkComponent);
    newFixture.componentRef.setInput('title', 'My Awesome App & More!');
    newFixture.componentRef.setInput(
      'link',
      'https://example.com/path?param=value'
    );
    newFixture.componentRef.setInput('img', 'icon-with-special-chars.svg');
    newFixture.detectChanges();
    expect(newFixture.nativeElement).toMatchSnapshot();
  });
});
