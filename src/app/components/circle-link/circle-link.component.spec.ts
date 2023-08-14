import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CircleLinkComponent } from './circle-link.component';

describe('CircleLinkComponent', () => {
  let component: CircleLinkComponent;
  let fixture: ComponentFixture<CircleLinkComponent>;
  let element: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CircleLinkComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleLinkComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    component.title = 'Test Title';
    component.link = 'https://example.com';
    component.img = 'test-image.jpg';

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
});
