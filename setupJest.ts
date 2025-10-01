import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';

// Setup the zone test environment
setupZoneTestEnv();

// Global test setup for Jest with Angular
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    display: 'none',
    appearance: ['-webkit-appearance']
  })
});

Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>'
});

Object.defineProperty(document.body.style, 'transform', {
  value: () => ({
    enumerable: true,
    configurable: true
  })
});

// Global beforeEach setup
beforeEach(() => {
  // Clear all mocks between tests
  jest.clearAllMocks();
  
  // Reset any module registry
  jest.resetModules();
});
